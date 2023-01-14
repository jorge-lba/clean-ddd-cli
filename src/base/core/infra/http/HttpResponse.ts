export interface IHttpResponse<Body> {
  statusCode: number;
  body?: Body | ObjectAny;
}

export function ok<T = ObjectAny> (dto: T): IHttpResponse<T> {
  return {
    statusCode: 200,
    body: dto
  }
}

export function created<T = ObjectAny> (dto: T): IHttpResponse<T> {
  return {
    statusCode: 201,
    body: dto
  }
}

export function noContent (): IHttpResponse<void> {
  return {
    statusCode: 204
  }
}

export function clientError (errors: Error[]): IHttpResponse<ManyErrors> {
  const data: ManyErrorBody[] = []
  errors.forEach((error) => {
    data.push({
      error: error.name,
      message: error.message
    })
  })

  return {
    statusCode: 400,
    body: {
      errors: data
    }
  }
}

export function unauthorized (error: Error): IHttpResponse<ErrorBody> {
  return {
    statusCode: 401,
    body: {
      error: error.message
    }
  }
}

export function forbidden (error: Error): IHttpResponse<ErrorBody> {
  return {
    statusCode: 403,
    body: {
      error: error.message
    }
  }
}

export function notFound (error: Error): IHttpResponse<ErrorBody> {
  return {
    statusCode: 404,
    body: {
      error: error.message
    }
  }
}

export function notAcceptable (error: Error): IHttpResponse<ErrorBody> {
  return {
    statusCode: 406,
    body: {
      error: error.message
    }
  }
}

export function fail (error: Error): IHttpResponse<ErrorBody> {
  console.log('Internal Server Error: ', error)

  return {
    statusCode: 500,
    body: {
      error: 'Internal Server Error'
    }
  }
}

type ErrorBody = {
  error: string
}

type ManyErrorBody = {
  error: string,
  message: string
}

type ManyErrors = {
  errors: ManyErrorBody[]
}

type ObjectAny = { [key: string]: any };
