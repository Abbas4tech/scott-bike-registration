export type APIResponse<T> = {
  data: T;
  status_code: 200;
};

export type APIErrorResponse = {
  error: string;
  status_code: number;
};
