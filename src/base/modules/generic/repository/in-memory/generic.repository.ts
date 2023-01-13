import { RepositoryInMemory } from "../../../../core/test/mock/repository.in-memory";
import { GenericAggregate } from "../../domain/generic.aggregate";
import { IGenericRepository } from "../generic.repository.interface";

export class GenericRepository 
extends RepositoryInMemory<GenericAggregate> 
implements IGenericRepository {}