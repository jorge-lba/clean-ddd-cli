import path from 'path';
import { copyDir, getFileList } from '../utils';

async function init(basedPath: string[], destPath: string[]) {
  const files = new Set<string>();
  const pathFolderCore = path.join(__dirname, ...basedPath);

  getFileList(pathFolderCore)
    .filter((file) => !file.includes('.spec'))
    .map((file) => {
      const values = file.split('/');
      values.pop();

      return values.join('/');
    })
    .forEach((file) => files.add(file));

  await Promise.all(
    Array.from(files.values()).map((file) =>
      copyDir({
        src: file,
        dest: file.replace(pathFolderCore, destPath.join('/')),
        ignore: '.spec.ts',
      }),
    ),
  );
}

export { init };
