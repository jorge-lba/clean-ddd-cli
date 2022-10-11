import { StringShouldContainOnlyDigitsError } from './StringShouldContainOnlyDigitsError';

describe('Domain Error - StringShouldContainOnlyDigitsError', () => {
  it('should create an StringShouldContainOnlyDigitsError error', async () => {
    const fieldName = 'any_field_name';
    const context = 'any_context';

    const error = new StringShouldContainOnlyDigitsError({
      context,
      fieldName,
    });

    expect(error).toBeInstanceOf(StringShouldContainOnlyDigitsError);
    expect(error.values).toEqual({
      id: expect.any(String),
      context,
      date: expect.any(Date),
      message: `The ${fieldName} field must contain digits only.`,
      name: 'StringShouldContainOnlyDigitsError',
    });
  });
});
