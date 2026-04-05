import type { IsoDateTime, UUID } from '@/types/primitives';

export type UserRole = 'admin' | 'regular';

export type UserStatus = 'active' | 'suspended' | 'pending_verification';

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export interface User {
  id: UUID;
  username: string;
  email: string;
  password?: string;
  picture?: string | null;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  oauthUserId?: UUID | null;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
}
