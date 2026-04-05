export interface Pagination {
  limit: number;
  offset: number;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}

export interface RedirectResponse {
  to: string;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export interface JwtPayload {
  sub: string;
  type: string;
  iat: number;
  exp: number;
}
