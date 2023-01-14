import { Entity } from '../../../core/domain';
import { BaseDates } from '../../../core/domain/types';

class GenericEntity extends Entity<GenericProps> {
  create(props: GenericProps, id?: string, baseDates?: BaseDates) {
    return new GenericEntity(props, id, baseDates);
  }
}

type GenericProps = {};

export { GenericEntity, GenericProps };
