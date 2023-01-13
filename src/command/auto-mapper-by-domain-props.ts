import fs from 'fs'
import path from 'path'
import { camelToSnakeCase } from '../utils'

export function autoMapperByDomainProps(dest: string, idType: 'string' | 'number', type?: string) {
  const file = dest?.split('/').pop()?.replace('mapper.', '')
  if(!file) throw new Error('File not is valid')
  
  const toDomain = fs.readFileSync(
    path.join(
      '.', 
      'src', 
      'modules', 
      dest?.split('/')[2], 
      'domain',
      type === 'value-object' ? 'value-object' : '', 
      file
    ), 
    'utf-8'
  )
  const params = toDomain.match(/type ([\S\s]*?)Props = \{([\S\s]*?)\}/)?.[0]

const toPersistenceProps = 
`type ToPersistenceProps = {
  id: ${idType} | null;

${params?.split('\n').slice(1, -1).map(item => {
  const [ key, value ] = item.split(':')

  return `${camelToSnakeCase(key)}: ${value.trim()}`
}).join('\n')}

  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}`


const toPersistence = fs.readFileSync(path.join(dest), 'utf-8')
const item = toPersistence
  .match(/\(item: ([\S\s]*?)\)/)?.[0]
  .replace('(item: ', '')
  .replace(')', '')

const toDomainMapper = 
`toDomain(props: ToPersistenceProps): ${item} {
    const valueObjectOrError = ${item}.create(
      {
        ${
          params?.split('\n').slice(1, -1).map(item => {
            const [ key ] = item.split(':')
          
            return `${key.trim()}: props.${camelToSnakeCase(key.trim())},`
          }).join('\n\t\t\t\t')
        }
      },
      String(props.id),
      {
        createdAt: props.created_at,
        updatedAt: props.updated_at,
        deletedAt: props.deleted_at,
      }
    )

    if(valueObjectOrError instanceof DomainError) {
      throw valueObjectOrError
    } 

    return valueObjectOrError
  }`

const toPersistenceMapper = 
`toPersistence(item: ${item}): ToPersistenceProps {
    const props = item.props

    return {
      id: item.id,

      ${
        params?.split('\n').slice(1, -1).map(item => {
          const [ key ] = item.split(':')
        
          return `${camelToSnakeCase(key.trim())}: props.${key.trim()},`
        }).join('\n\t\t\t')
      }

      created_at: item.dates.createdAt,
      updated_at: item.dates.updatedAt,
      deleted_at: item.dates.deletedAt,
    }
  }`

const mapperData = toPersistence
  .replace(/type ToPersistenceProps = \{([\S\s]*?)\}/, toPersistenceProps)
  .replace(/toPersistence\(item: ([\S\s]*?)\): ToPersistenceProps \{([\S\s]*?)\}/, toPersistenceMapper)
  .replace(/toDomain\(props: ToPersistenceProps\): ([\S\s]*?) \{([\S\s]*?)\}/, toDomainMapper)

fs.writeFileSync(path.join(dest), mapperData)
}