import path from 'path'
import { camelize, copyFile, upperFirstLetter } from "../utils"

function valueObject(moduleName: string, valueObjectName: string){
  const pathFolder = path.join(
    __dirname, 
    '..', 
    '..', 
    'src', 
    'base', 
    'modules', 
    'generic', 
    'domain',
    'value-object',
    'generic.value-object.ts'
  )

  copyFile({
    src: pathFolder,
    dest: pathFolder.replace(pathFolder, `src/modules/${moduleName}/domain/value-object/${valueObjectName}.value-object.ts`),
    ignore: '.spec.ts',
    replaceWord: {
      current: 'Generic',
      next: upperFirstLetter(camelize(valueObjectName))
    }
  })
}

export { valueObject }