import path from 'path';
import { camelize, copyDir, getFileList, upperFirstLetter } from '../utils';

function useCase(moduleName: string, useCaseName: string) {
  const files = new Set<string>();

  const pathFolder = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'use-case',
    'generic-use-case',
  );

  getFileList(pathFolder)
    .map((file) => {
      const values = file.split('/');
      values.pop();

      return values.join('/');
    })
    .forEach((file) => files.add(file));

  Array.from(files.values()).forEach((file) =>
    copyDir({
      src: file,
      dest: file.replace(
        pathFolder,
        `src/modules/${moduleName}/use-case/${useCaseName}`,
      ),
      ignore: '.spec.ts',
      replaceWord: {
        current: 'Generic',
        next: upperFirstLetter(camelize(useCaseName)),
      },
    }),
  );
}

export { useCase };
