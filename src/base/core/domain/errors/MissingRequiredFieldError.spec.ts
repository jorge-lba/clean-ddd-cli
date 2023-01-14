import { MissingRequiredFieldError } from './MissingRequiredFieldError'

describe('MissingRequiredFields', () => {
  it('Should create an MissingRequiredField error with an array of fields', () => {
    const fields = ['any_param', 'another_param']
    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `Some fields were not provided: ${fields}`,
      name: 'MissingRequiredField'
    }

    const requiredFieldError = new MissingRequiredFieldError({
      fields,
      context: 'any_context'
    })

    expect(requiredFieldError).toBeInstanceOf(MissingRequiredFieldError)
    expect(requiredFieldError.values).toEqual(expectedProps)
  })

  it('Should create an MissingRequiredField error with an unique field', () => {
    const fields = 'unique_field'
    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `Some fields were not provided: ${fields}`,
      name: 'MissingRequiredField'
    }

    const requiredFieldError = new MissingRequiredFieldError({
      fields,
      context: 'any_context'
    })

    expect(requiredFieldError).toBeInstanceOf(MissingRequiredFieldError)
    expect(requiredFieldError.values).toEqual(expectedProps)
  })
})
