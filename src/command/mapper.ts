import path from 'path'
import { camelize, copyFile, upperFirstLetter } from "../utils"

function mapper(moduleName: string, mapperName: string){
  const pathFolder = path.join(
    __dirname, 
    '..', 
    'base', 
    'modules', 
    'generic', 
    'mapper', 
    'generic.mapper.ts'
  )

  const snakeMapperName = mapperName
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(' ')
    .join('-')
    .toLocaleLowerCase()
  
  const regex = new RegExp(/(-value-object|-entity|-aggregate)/)
  const [name, px] = snakeMapperName.split(regex)
  const prefix = px.replace('-', '')
  const compositeName = prefix !== 'value-object' ? `${name}-${prefix}` : name


  copyFile({
    src: pathFolder,
    dest: pathFolder.replace(
      pathFolder, 
      `src/modules/${moduleName}/mapper/${name}.${prefix}.mapper.ts`
    ),
    ignore: '.spec.ts',
    replaceWords: [
      {
        current: 'GenericAggregate',
        next: upperFirstLetter(camelize(compositeName))
      },
      {
        current: 'Generic',
        next: upperFirstLetter(camelize(compositeName))
      },
      {
        current: 'aggregate',
        next: prefix
      },
      {
        current: 'generic',
        next: `${prefix === 'value-object' ? 'value-object/' : ''}${name}`
      }
    ]
  })
}

export { mapper }
