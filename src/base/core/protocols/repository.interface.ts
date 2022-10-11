export interface IRepository<Entity> {
  findById(entityId: string): Promise<Entity | null>;
  exists(entityId: string): Promise<boolean>;
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}
