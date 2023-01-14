import { left, right } from '../../../../core/shared/logic/Either'
import { GenericDTO, GenericResponseDTO } from './dto'
import { GenericUseCaseReturn, IGenericUseCase } from './type'

export class GenericUseCase
implements IGenericUseCase {
  async handle (
    dto: GenericDTO
  ): Promise<GenericUseCaseReturn> {
    const isError = new Error('Method not implemented!')
    if (isError instanceof Error) {
      return left(isError)
    }

    return right(new GenericResponseDTO())
  }
}
