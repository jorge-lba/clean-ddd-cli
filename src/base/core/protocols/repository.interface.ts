export interface IRepository<Entity> {
  findById(entityId: string): Promise<Entity | null>;
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}
