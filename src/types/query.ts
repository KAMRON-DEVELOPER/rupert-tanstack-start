import type { IsoDateTime } from './primitives';
import type { Pagination } from './types';

export interface ProjectIdQuery {
  projectId: string;
}

export interface DeploymentIdQuery {
  deploymentId: string;
}

export interface PodUidQuery {
  podUid: string;
}

export interface StartTimeRangeQuery {
  start: IsoDateTime;
}

export interface EndTimeRangeQuery {
  end?: IsoDateTime;
}

export interface TimeWindowQuery {
  minutes?: number;
}

export type ProjectPageQuery = ProjectIdQuery & TimeWindowQuery & Pagination;
export type GetPodsQuery = ProjectIdQuery & DeploymentIdQuery & TimeWindowQuery & Pagination;
export type LogQuery = ProjectIdQuery & DeploymentIdQuery & PodUidQuery & StartTimeRangeQuery & EndTimeRangeQuery;
