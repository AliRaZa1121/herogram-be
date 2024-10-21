import { JsonApiVersion } from '../swagger-responses/base-response';

export interface SuccessApiWrapperInterface<TData> {
  message?: string[];
  data: TData;
  statusCode: number;
  jsonApiVersion: JsonApiVersion;
}

export interface ErrorApiWrapperInterface {
  error: string;
  message: string[];
  statusCode: number;
  jsonApiVersion: JsonApiVersion;
}
