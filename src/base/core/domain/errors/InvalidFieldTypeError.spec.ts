import { InvalidFieldTypeError } from './InvalidFieldTypeError';

describe('InvalidFieldTypeError', () => {
  it('Should create an InvalidFieldTypeError error', () => {
    const field = 'field_with_error';
    const correctType = 'number';

    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `The type of ${field} is invalid. Instead, use ${correctType}.`,
      name: 'InvalidFieldType',
    };

    const invalidFieldTypeError = new InvalidFieldTypeError({
      field,
      correctType,
      context: 'any_context',
    });

    expect(invalidFieldTypeError).toBeInstanceOf(InvalidFieldTypeError);
    expect(invalidFieldTypeError.values).toEqual(expectedProps);
  });
});
