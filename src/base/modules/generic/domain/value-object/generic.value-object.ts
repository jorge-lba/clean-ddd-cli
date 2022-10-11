import { ValueObject } from '../../../../core/domain';
import { BaseDates } from '../../../../core/domain/types';

class Generic extends ValueObject<GenericProps> {
  static create(props: GenericProps, id?: string, baseDates?: BaseDates) {
    return new this(props, id, baseDates);
  }
}

type GenericProps = {};

export { Generic, GenericProps };