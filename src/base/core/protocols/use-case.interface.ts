export interface IUseCase<DTO, Result> {
  handle(dto: DTO): Promise<Result>;
}
