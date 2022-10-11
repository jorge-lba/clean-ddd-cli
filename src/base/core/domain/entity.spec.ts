import { Entity } from './entity';

interface TestEntityProps {
  id?: string;
  value: string;
}

class TestEntity extends Entity<TestEntityProps> {
  constructor(props: TestEntityProps, id?: string) {
    super(props, id);
  }

  static create(props: TestEntityProps, id?: string) {
    return new TestEntity(props, id);
  }

  forceError() {
    this.includeNewError(new Error());
  }
}

describe('Domain - Entity', () => {
  it('should be false case first TestEntity not is equal second TestEntity', function () {
    const testEntityFirst = TestEntity.create({
      value: 'test',
    });
    const testEntitySecond = TestEntity.create(
      {
        value: 'test',
      },
      'any_id',
    );

    expect(testEntityFirst.equals(testEntitySecond)).toBe(false);
  });

  it('should be false case second TestEntity is undefined', function () {
    const testEntityFirst = TestEntity.create({
      value: 'test',
    });
    const testEntitySecond = undefined;

    expect(testEntityFirst.equals(testEntitySecond)).toBe(false);
  });

  it('should be false case second TestEntity not is entity', function () {
    const testEntityFirst = TestEntity.create({
      value: 'test',
    });
    const testEntitySecond = { id: '546541354' } as TestEntity;

    expect(testEntityFirst.equals(testEntitySecond)).toBe(false);
  });

  it('should be true case second TestEntity is equal the first', function () {
    const testEntityFirst = TestEntity.create({
      value: 'test',
    });
    const testEntitySecond = testEntityFirst;

    expect(testEntityFirst.equals(testEntitySecond)).toBe(true);
  });

  it('should be included one domain error in entity', function () {
    const testEntity = TestEntity.create({
      value: 'test',
    });
    testEntity.forceError();

    expect(testEntity.errors.size).toBe(1);
  });

  it('should not be valid if it contains errors', function () {
    const testEntity = TestEntity.create({
      value: 'test',
    });
    testEntity.forceError();
    expect(testEntity.isValid()).toBe(false);
  });

  it('should be valid if it does not contain errors', function () {
    const testEntity = TestEntity.create({
      value: 'test',
    });
    testEntity.forceError();
    expect(testEntity.isValid()).toBe(false);
  });

  it('should be able to map props and id', function () {
    const id = 'id';
    const props = {
      value: 'test',
    };

    const testEntity = TestEntity.create(props, id);

    expect(testEntity.props).toEqual(props);
    expect(testEntity.id).toEqual(id);
  });
});
