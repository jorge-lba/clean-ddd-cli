import fs from 'node:fs';
import { describe, test, expect, afterAll } from 'vitest';
import { aggregate } from '../../command/aggregate';

export const commandAggregateDescribe = () =>
  describe('Name of the group', () => {
    const deleteFilesPath: string[] = [];
    const baseDestPath = ['tmp', 'src'];
    const rootDir = process.cwd();

    test('should ', async () => {
      const basedPath = [
        '..',
        '..',
        'src',
        'base',
        'modules',
        'generic',
        'domain',
        'generic.aggregate.ts',
      ];

      const name = 'test';
      const module = 'test';
      const aggregateName = 'Test';

      await aggregate({
        basedPath,
        destPath: baseDestPath,
        aggregateName: name,
        moduleName: module,
      });

      const base = fs
        .readFileSync(
          `${rootDir}/src/base/modules/generic/domain/generic.aggregate.ts`,
        )
        .toString()
        .replace(/Generic/g, aggregateName);

      const generatedPath = `${rootDir}/tmp/src/modules/${module}/domain/${name}.aggregate.ts`;
      deleteFilesPath.push(generatedPath);

      const generated = fs.readFileSync(generatedPath).toString();

      expect(base).toEqual(generated);
    });

    afterAll(() => {
      deleteFilesPath.forEach((path) =>
        fs.rmSync(path, {
          recursive: true,
        }),
      );
    });
  });
