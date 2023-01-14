import { IFactory } from '../../../../core/protocols/factory.interface'
import { GenericController } from './controller'
import { GenericUseCase } from './use-case'

class GenericControllerFactory implements IFactory<GenericController, void> {
  execute (): GenericController {
    const useCase = new GenericUseCase()
    return new GenericController(useCase)
  }
}

export {
  GenericControllerFactory,
  GenericController,
  GenericUseCase
}
