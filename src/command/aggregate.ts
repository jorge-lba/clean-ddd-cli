import path from 'path'
import { camelize, copyFile, upperFirstLetter } from '../utils'

function aggregate (moduleName: string, aggregateName: string) {
  const pathFolder = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'domain',
    'generic.aggregate.ts'
  )

  copyFile({
    src: pathFolder,
    dest: pathFolder.replace(pathFolder, `src/modules/${moduleName}/domain/${aggregateName}.aggregate.ts`),
    ignore: '.spec.ts',
    replaceWord: {
      current: 'Generic',
      next: upperFirstLetter(camelize(aggregateName))
    }
  })
}

export { aggregate }
