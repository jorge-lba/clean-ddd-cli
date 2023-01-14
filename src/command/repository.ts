import path from 'path'
import { camelize, copyFile, upperFirstLetter } from '../utils'

function repository (moduleName: string, repositoryName: string) {
  const pathFolderInterface = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'repository',
    'generic.repository.interface.ts'
  )

  const pathFolderImplementation = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'repository',
    'implementation',
    'generic.repository.ts'
  )

  const pathFolderInMemory = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'repository',
    'in-memory',
    'generic.repository.ts'
  )

  copyFile({
    src: pathFolderInterface,
    dest: pathFolderInterface.replace(pathFolderInterface, `src/modules/${moduleName}/repository/${repositoryName}.repository.interface.ts`),
    ignore: '.spec.ts',
    replaceWords: [
      {
        current: 'Generic',
        next: upperFirstLetter(camelize(repositoryName))
      },
      {
        current: 'generic',
        next: camelize(repositoryName)
      }
    ]
  })

  copyFile({
    src: pathFolderImplementation,
    dest: pathFolderImplementation.replace(pathFolderImplementation, `src/modules/${moduleName}/repository/implementation/${repositoryName}.repository.ts`),
    ignore: '.spec.ts',
    replaceWords: [
      {
        current: 'Generic',
        next: upperFirstLetter(camelize(repositoryName))
      },
      {
        current: 'generic',
        next: camelize(repositoryName)
      }
    ]
  })

  copyFile({
    src: pathFolderInMemory,
    dest: pathFolderInMemory.replace(pathFolderInMemory, `src/modules/${moduleName}/repository/in-memory/${repositoryName}.repository.ts`),
    ignore: '.spec.ts',
    replaceWords: [
      {
        current: 'Generic',
        next: upperFirstLetter(camelize(repositoryName))
      },
      {
        current: 'generic',
        next: camelize(repositoryName)
      }
    ]
  })
}

export { repository }
