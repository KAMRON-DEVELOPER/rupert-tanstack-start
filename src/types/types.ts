export interface Pagination {
  limit: number;
  offset: number;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}

export interface MessageResponse {
  message: string;
}

export interface ErrorResponse {
  error: string;
}

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Tag {
  name: string;
}

export interface Skill {
  name: string;
}
