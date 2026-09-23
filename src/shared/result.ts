export type Result<TData, TError> = |
{
  data: TData;
  error?: never
} | {
  data?: never;
  error: TError
};