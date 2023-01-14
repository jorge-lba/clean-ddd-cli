import { InvalidFieldSizeError } from './InvalidFieldSizeError'

describe('InvalidFieldSizeError', () => {
  it('Should create an InvalidFieldSizeError error', () => {
    const field = 'field_with_error'
    const maxSize = 'max'

    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `The maximum size of the ${field} field is ${maxSize}`,
      name: 'InvalidFieldSizeError'
    }

    const invalidFieldTypeError = new InvalidFieldSizeError({
      field,
      maxSize,
      context: 'any_context'
    })

    expect(invalidFieldTypeError).toBeInstanceOf(InvalidFieldSizeError)
    expect(invalidFieldTypeError.values).toEqual(expectedProps)
  })
})
