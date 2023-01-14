import { DomainError, UseCaseError } from '../../../../core/domain/errors';
import { IController, IUseCase } from '../../../../core/protocols';
import { Either } from '../../../../core/shared/logic/Either';
import { GenericDTO, GenericResponseDTO } from './dto';

type IGenericUseCase = IUseCase<GenericDTO, GenericUseCaseReturn>;
type GenericUseCaseReturn = Either<
  DomainError | UseCaseError | Error,
  GenericResult
>;
type GenericResult = GenericResponseDTO;

type GenericControllerResponse = GenericResponseDTO;
type IGenericController = IController<GenericDTO, GenericControllerResponse>;

export {
  IGenericUseCase,
  GenericUseCaseReturn,
  IGenericController,
  GenericControllerResponse,
};
