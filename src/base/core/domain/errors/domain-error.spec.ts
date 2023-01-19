import { describe, it, expect, beforeAll } from 'vitest';
import { DomainError } from './domain-error';

class TestDomainError extends DomainError {
  constructor() {
    super({
      message: 'error-message',
      context: 'error-context',
      name: 'TestDomainError',
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
      name: 'TestDomainError',
      date: expect.any(Date),
      id: expect.any(String),
    });
  });
});
