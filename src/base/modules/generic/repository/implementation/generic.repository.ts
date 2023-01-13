import { GenericAggregate } from "../../domain/generic.aggregate";
import { IGenericRepository } from "../generic.repository.interface";

export class GenericRepository implements IGenericRepository {
  private database: unknown

  constructor(){
    this.database = undefined
    if(!this.database) {
      throw new Error('Include database connection in "this.database"')
    }
  }

  async findById(entityId: string): Promise<GenericAggregate | null> {
    throw new Error("Method not implemented.");
  }

  async create(entity: GenericAggregate): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async update(entity: GenericAggregate): Promise<void> {
    throw new Error("Method not implemented.");
  }
}