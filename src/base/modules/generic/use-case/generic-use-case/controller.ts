import { clientError, IHttpResponse, ok } from '../../../../core/infra/http'
import { GenericDTO, GenericResponseDTO } from './dto'
import { IGenericController, IGenericUseCase } from './type'

export class GenericController
implements IGenericController {
  constructor (
    private readonly useCase: IGenericUseCase
  ) {}

  async execute (
    dto: GenericDTO
  ): Promise<IHttpResponse<GenericResponseDTO>> {
    const result = await this.useCase.handle(dto)

    if (result.isLeft()) {
      return clientError([result.value])
    }

    return ok(result.value)
  }
}
