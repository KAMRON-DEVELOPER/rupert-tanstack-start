import type { IsoDateTime, UUID } from '@/types/primitives';

export interface OAuthUser {
  id: UUID;
  provider: string;
  username?: string;
  email?: string;
  password?: string;
  picture?: string;
  createdAt?: IsoDateTime;
}
