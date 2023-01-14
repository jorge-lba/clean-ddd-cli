import { IHttpResponse } from '../infra/http'

export interface IController<DTO, ResponseDTO> {
  execute(dto: DTO, res?: any): Promise<IHttpResponse<ResponseDTO>>;
}
