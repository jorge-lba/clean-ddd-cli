import { DomainError } from './DomainError';
import { UseCaseError } from './UseCaseError';

class TestUseCaseError extends UseCaseError {
  constructor(errors: string | DomainError[]) {
    super(errors);
  }
}

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

    const makeMessageSpy = jest.spyOn(UseCaseError, 'makeMessage');

    const domainError = new TestDomainError();
    const errors = [domainError];

    const useCaseError = new TestUseCaseError(errors);

    expect(useCaseError.name).toBe('TestUseCaseError');
    expect(useCaseError.message).toEqual('\n error-message');
    expect(makeMessageSpy).toHaveBeenCalledWith(errors);
  });
});
