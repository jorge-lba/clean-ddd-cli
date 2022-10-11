import { ValueObject } from './value-object';

type FakeProps = {
  name: string;
};

class FakeValueObject extends ValueObject<FakeProps> {
  constructor(props: FakeProps, id?: string) {
    super(props, id);
  }

  static create(values: FakeProps, id?: string): FakeValueObject {
    return new FakeValueObject(values, id);
  }
}

const makeSut = (props: FakeProps, id?: string): FakeValueObject => {
  return FakeValueObject.create(props, id);
};

describe('Domain - ValueObject', () => {
  it('Should compare two value objects and return false', () => {
    const fakeValueObject = makeSut({ name: 'any_name' });
    const otherFakeValueObject = makeSut({ name: 'other_name' });
    expect(fakeValueObject.equals(otherFakeValueObject)).toBeFalsy();
  });

  it('Should compare two value objects and return true', () => {
    const fakeValueObject = makeSut({ name: 'any_name' });
    const otherFakeValueObject = makeSut({ name: 'any_name' });
    expect(fakeValueObject.equals(otherFakeValueObject)).toBeTruthy();
  });

  it('Should create an instance with the same values that was sent', () => {
    const fakeValueObject = makeSut({ name: 'any_name' });
    expect(fakeValueObject.props).toEqual({ name: 'any_name' });
  });

  it('Should create an instance with the same values and id that was sent', () => {
    const fakeValueObject = makeSut({ name: 'any_name' }, 'any_id');
    expect(fakeValueObject.props).toEqual({ name: 'any_name' });
    expect(fakeValueObject.id).toEqual('any_id');
  });

  it('should be deleted', () => {
    const fakeValueObject = makeSut({ name: 'any_name' }, 'any_id');
    fakeValueObject.delete();

    expect(Object(fakeValueObject)._baseDates.deletedAt).toBeDefined();
  });
});
