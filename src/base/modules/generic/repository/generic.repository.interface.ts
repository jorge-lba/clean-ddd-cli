import { IRepository } from '../../../core/protocols';
import { GenericAggregate } from '../domain/generic.aggregate';

export type IGenericRepository = IRepository<GenericAggregate>;
