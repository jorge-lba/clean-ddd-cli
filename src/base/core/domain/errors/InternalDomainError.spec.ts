import { InternalDomainError } from './InternalDomainError'

class TestInternalDomainError extends InternalDomainError {
  constructor () {
    super({
      message: 'error-message',
      context: 'error-context',
      name: 'error-name'
    })
  }
}

describe('Errors - Domain Error', () => {
  let domain: TestInternalDomainError

  beforeAll(() => {
    domain = new TestInternalDomainError()
  })

  it('should map correctly error data', async () => {
    expect(domain.values).toEqual({
      message: 'error-message',
      context: 'error-context',
      name: 'error-name',
      date: expect.any(Date),
      id: expect.any(String)
    })
  })
})
