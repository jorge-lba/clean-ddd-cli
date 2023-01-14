import fs from 'fs';
import { init } from '../../command/inti';

export const commandInitDescribe = () =>
  describe('- init', () => {
    const baseDestPath = ['tmp', 'src'];
    const rootDir = process.cwd();

    test('step 1: run command', async () => {
      const basedPath = ['..', '..', 'src', 'base', 'core'];
      const destPath = [...baseDestPath, 'core'];
      await init(basedPath, destPath);

      const expectedBaseFolder = [...baseDestPath, 'core'].join('/');
      const pathExists = fs.existsSync(expectedBaseFolder);

      expect(pathExists).toBeTruthy();
    });

    describe('domain files: ', () => {
      test('aggregate.ts', async () => {
        const base = fs.readFileSync(
          `${rootDir}/src/base/core/domain/aggregate.ts`,
        );
        const generated = fs.readFileSync(
          `${rootDir}/tmp/src/core/domain/aggregate.ts`,
        );

        expect(base).toEqual(generated);
      });

      test('entity.ts', async () => {
        const base = fs.readFileSync(
          `${rootDir}/src/base/core/domain/entity.ts`,
        );
        const generated = fs.readFileSync(
          `${rootDir}/tmp/src/core/domain/entity.ts`,
        );

        expect(base).toEqual(generated);
      });

      test('value-object.ts', async () => {
        const base = fs.readFileSync(
          `${rootDir}/src/base/core/domain/value-object.ts`,
        );
        const generated = fs.readFileSync(
          `${rootDir}/tmp/src/core/domain/value-object.ts`,
        );

        expect(base).toEqual(generated);
      });

      test('index.ts', async () => {
        const base = fs.readFileSync(
          `${rootDir}/src/base/core/domain/index.ts`,
        );
        const generated = fs.readFileSync(
          `${rootDir}/tmp/src/core/domain/index.ts`,
        );

        expect(base).toEqual(generated);
      });

      describe('errors: ', () => {
        test('DomainError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/DomainError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/DomainError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('InternalDomainError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/InternalDomainError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/InternalDomainError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('InvalidFieldSizeError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/InvalidFieldSizeError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/InvalidFieldSizeError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('InvalidFieldTypeError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/InvalidFieldTypeError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/InvalidFieldTypeError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('MissingRequiredFieldError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/MissingRequiredFieldError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/MissingRequiredFieldError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('MissingRequiredInternalFieldError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/MissingRequiredInternalFieldError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/MissingRequiredInternalFieldError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('StringShouldContainOnlyDigitsError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/StringShouldContainOnlyDigitsError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/StringShouldContainOnlyDigitsError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('StringShouldContainOnlyLettersError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/StringShouldContainOnlyLettersError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/StringShouldContainOnlyLettersError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('UseCaseError.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/UseCaseError.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/UseCaseError.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('index.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/errors/index.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/errors/index.ts`,
          );

          expect(base).toEqual(generated);
        });
      });

      describe('events: ', () => {
        test('domain-events.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/events/domain-events.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/events/domain-events.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('domain-events.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/events/domain-events.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/events/domain-events.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('use-case-events.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/events/use-case-events.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/events/use-case-events.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('use-case-events.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/events/use-case-events.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/events/use-case-events.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('index.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/events/index.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/events/index.ts`,
          );

          expect(base).toEqual(generated);
        });
      });

      describe('types: ', () => {
        test('async-subscribe-return.type.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/types/async-subscribe-return.type.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/types/async-subscribe-return.type.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('base-dates.type.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/types/base-dates.type.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/types/base-dates.type.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('index.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/domain/types/index.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/domain/types/index.ts`,
          );

          expect(base).toEqual(generated);
        });
      });
    });

    describe('infra files:', () => {
      describe('http:', () => {
        test('HttpResponse.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/infra/http/HttpResponse.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/infra/http/HttpResponse.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('index.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/infra/http/index.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/infra/http/index.ts`,
          );

          expect(base).toEqual(generated);
        });
      });
    });

    describe('protocols files:', () => {
      describe('http:', () => {
        test('controller.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/controller.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/controller.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('controller.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/controller.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/controller.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('factory.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/factory.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/factory.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('handle.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/handle.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/handle.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('mapper.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/mapper.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/mapper.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('repository.interface.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/repository.interface.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/repository.interface.ts`,
          );

          expect(base).toEqual(generated);
        });

        test('index.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/protocols/index.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/protocols/index.ts`,
          );

          expect(base).toEqual(generated);
        });
      });
    });

    describe('shared files:', () => {
      describe('logic:', () => {
        test('Either.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/shared/logic/Either.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/shared/logic/Either.ts`,
          );

          expect(base).toEqual(generated);
        });
      });
    });

    describe('test files:', () => {
      describe('mock:', () => {
        test('repository.in-memory.ts', async () => {
          const base = fs.readFileSync(
            `${rootDir}/src/base/core/test/mock/repository.in-memory.ts`,
          );
          const generated = fs.readFileSync(
            `${rootDir}/tmp/src/core/test/mock/repository.in-memory.ts`,
          );

          expect(base).toEqual(generated);
        });
      });
    });

    afterAll(() => {
      fs.rmSync(`${process.cwd()}/tmp`, { recursive: true });
    });
  });
