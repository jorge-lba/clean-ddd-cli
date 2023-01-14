import path from 'path';
import {
  camelize,
  camelToSnakeCase,
  copyFile,
  upperFirstLetter,
} from '../utils';

function mapper(
  moduleName: string,
  mapperName: string,
  type: string,
  force?: boolean,
) {
  const pathFolder = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'base',
    'modules',
    'generic',
    'mapper',
    'generic.mapper.ts',
  );

  const name = camelToSnakeCase(mapperName);
  const compositeName = type !== 'value-object' ? `${name}-${type}` : name;

  copyFile({
    src: pathFolder,
    dest: pathFolder.replace(
      pathFolder,
      `src/modules/${moduleName}/mapper/${name}.${type}.mapper.ts`,
    ),
    ignore: '.spec.ts',
    replaceWords: [
      {
        current: 'GenericAggregate',
        next: upperFirstLetter(camelize(compositeName)),
      },
      {
        current: 'Generic',
        next: upperFirstLetter(camelize(compositeName)),
      },
      {
        current: 'aggregate',
        next: type,
      },
      {
        current: 'generic',
        next: `${type === 'value-object' ? 'value-object/' : ''}${name}`,
      },
    ],
    forceRewrite: force,
  });
}

export { mapper };
