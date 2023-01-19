import { describe, it, expect, vitest } from 'vitest';
import { DomainError } from './domain-error';
import { UseCaseError } from './use-case-error';

class TestUseCaseError extends UseCaseError {}

describe('Errors - UseCase', () => {
  it('should map correctly the error name and message', async () => {
    const useCaseError = new TestUseCaseError('error_message');

    expect(useCaseError.message).toBe('error_message');
    expect(useCaseError.name).toBe('TestUseCaseError');
  });

  it('should map correctly the errors name and messages', async () => {
    class TestDomainError extends DomainError {
      constructor() {
        super({
          message: 'error-message',
          context: 'error-context',
          name: 'error-name',
        });
      }
    }

    const makeMessageSpy = vitest.spyOn(UseCaseError, 'makeMessage');

    const domainError = new TestDomainError();
    const errors = [domainError];

    const useCaseError = new TestUseCaseError(errors);

    expect(useCaseError.name).toBe('TestUseCaseError');
    expect(useCaseError.message).toEqual('\n error-message');
    expect(makeMessageSpy).toHaveBeenCalledWith(errors);
  });
});
