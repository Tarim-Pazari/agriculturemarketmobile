export default interface ServiceResponse<T> {
  hasExceptionError: boolean;
  isSuccess: boolean;
  exceptionMessage: string;
  count: number;
  entity: T;
  list: T[];
  message: string;
}
