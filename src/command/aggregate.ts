import path from 'path';
import {
  camelize,
  copyFile,
  upperFirstLetter,
  lowerFirstLetter,
} from '../utils';

async function aggregate({
  aggregateName,
  basedPath,
  destPath,
  moduleName,
}: AggregateProps) {
  const pathFolder = path.join(__dirname, ...basedPath);
  const dest = destPath.join('/');

  await copyFile({
    src: pathFolder,
    dest: `${dest}/modules/${moduleName}/domain/${lowerFirstLetter(
      aggregateName,
    )}.aggregate.ts`,
    ignore: '.spec.ts',
    replaceWord: {
      current: 'Generic',
      next: upperFirstLetter(camelize(aggregateName)),
    },
  });
}

type AggregateProps = {
  moduleName: string;
  aggregateName: string;
  basedPath: string[];
  destPath: string[];
};

export { aggregate };
