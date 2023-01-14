import { DomainEvents } from '../../domain/events';
import { IRepository } from '../../protocols';

export abstract class RepositoryInMemory<Entity>
  implements IRepository<Entity>
{
  private _entities: Map<string, Entity> = new Map();

  get entities() {
    return new Map(this._entities);
  }

  get entitiesAsArray() {
    return Array.from(this.entities.values());
  }

  async findById(entityId: string): Promise<Entity | null> {
    const entity = this.entities.get(entityId);

    if (!entity) return null;

    return entity;
  }

  async create(entity: Entity): Promise<void> {
    DomainEvents.dispatchEventsForAggregate(Object(entity).id);
    this._entities.set(Object(entity).id, entity);
  }

  async update(entity: Entity): Promise<void> {
    DomainEvents.dispatchEventsForAggregate(Object(entity).id);
    this._entities.set(Object(entity).id, entity);
  }
}
