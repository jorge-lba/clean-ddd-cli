import { IMapper } from '../../../core/protocols/mapper.interface'
import { GenericAggregate } from '../domain/generic.aggregate'

export class GenericMapper implements IMapper<GenericAggregate, ToPersistenceProps> {
  toDomain (props: ToPersistenceProps): GenericAggregate {
    throw new Error('Method not implemented.')
  }

  toPersistence (item: GenericAggregate): ToPersistenceProps {
    throw new Error('Method not implemented.')
  }
}

type ToPersistenceProps = {
  street: string;
  number: number;
}
