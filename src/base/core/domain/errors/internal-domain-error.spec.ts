import { describe, it, expect, beforeAll } from 'vitest';
import { InternalDomainError } from './internal-domain-error';

class TestInternalDomainError extends InternalDomainError {
  constructor() {
    super({
      message: 'error-message',
      context: 'error-context',
      name: 'error-name',
    });
  }
}

describe('Errors - Domain Error', () => {
  let domain: TestInternalDomainError;

  beforeAll(() => {
    domain = new TestInternalDomainError();
  });

  it('should map correctly error data', async () => {
    expect(domain.values).toEqual({
      message: 'error-message',
      context: 'error-context',
      name: 'TestInternalDomainError',
      date: expect.any(Date),
      id: expect.any(String),
    });
  });
});
