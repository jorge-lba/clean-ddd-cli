import { Aggregate } from '../../../core/domain';
import { BaseDates } from '../../../core/domain/types';

class GenericAggregate extends Aggregate<GenericProps> {
  static create(props: GenericProps, id?: string, baseDates?: BaseDates) {
    return new GenericAggregate(props, id, baseDates);
  }
}

type GenericProps = {};

export { GenericAggregate, GenericProps };
