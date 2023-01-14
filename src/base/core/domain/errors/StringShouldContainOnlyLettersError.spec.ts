import { StringShouldContainOnlyLettersError } from './StringShouldContainOnlyLettersError'

describe('Domain Error - StringShouldContainOnlyLetters', () => {
  it('should create an StringShouldContainOnlyLetters error', async () => {
    const fieldName = 'any_field_name'
    const context = 'any_context'

    const error = new StringShouldContainOnlyLettersError({
      context,
      fieldName
    })

    expect(error).toBeInstanceOf(StringShouldContainOnlyLettersError)
    expect(error.values).toEqual({
      id: expect.any(String),
      context,
      date: expect.any(Date),
      message: `The ${fieldName} field must contain only letters.`,
      name: 'StringShouldContainOnlyLetters'
    })
  })
})
