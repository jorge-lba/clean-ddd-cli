import path from 'path'
import { camelize, copyFile, upperFirstLetter } from '../utils'

function entity (moduleName: string, entityName: string) {
  const pathFolder = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'domain',
    'generic.entity.ts'
  )

  copyFile({
    src: pathFolder,
    dest: pathFolder.replace(pathFolder, `src/modules/${moduleName}/domain/${entityName}.entity.ts`),
    ignore: '.spec.ts',
    replaceWord: {
      current: 'Generic',
      next: upperFirstLetter(camelize(entityName))
    }
  })
}

export { entity }
