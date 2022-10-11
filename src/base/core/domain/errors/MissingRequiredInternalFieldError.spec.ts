import { MissingRequiredInternalFieldError } from './MissingRequiredInternalFieldError';

describe('MissingRequiredInternalField', () => {
  it('Should create an MissingRequiredInternalFieldError error with an array of fields', () => {
    const fields = ['any_param', 'another_param'];
    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `These internal fields are mandatory requirements: ${fields}`,
      name: 'MissingRequiredInternalFieldError',
    };

    const requiredFieldError = new MissingRequiredInternalFieldError({
      fields,
      context: 'any_context',
    });

    expect(requiredFieldError).toBeInstanceOf(
      MissingRequiredInternalFieldError,
    );
    expect(requiredFieldError.values).toEqual(expectedProps);
  });

  it('Should create an MissingRequiredInternalFieldError error with an unique field', () => {
    const fields = 'unique_field';
    const expectedProps = {
      id: expect.any(String),
      context: 'any_context',
      date: expect.any(Date),
      message: `These internal fields are mandatory requirements: ${fields}`,
      name: 'MissingRequiredInternalFieldError',
    };

    const requiredFieldError = new MissingRequiredInternalFieldError({
      fields,
      context: 'any_context',
    });

    expect(requiredFieldError).toBeInstanceOf(
      MissingRequiredInternalFieldError,
    );
    expect(requiredFieldError.values).toEqual(expectedProps);
  });
});
