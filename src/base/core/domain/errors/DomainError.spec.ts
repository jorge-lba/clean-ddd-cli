import { DomainError } from './DomainError';

class TestDomainError extends DomainError {
  constructor() {
    super({
      message: 'error-message',
      context: 'error-context',
      name: 'error-name',
    });
  }
}

describe('Errors - Domain Error', () => {
  let domain: TestDomainError;

  beforeAll(() => {
    domain = new TestDomainError();
  });

  it('should map correctly error data', async () => {
    expect(domain.values).toEqual({
      message: 'error-message',
      context: 'error-context',
      name: 'error-name',
      date: expect.any(Date),
      id: expect.any(String),
    });
  });
});
