export interface IMapper<T, P> {
  toDomain(item: P): T;
  toPersistence(props: T): P;
}
