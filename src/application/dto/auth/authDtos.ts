export interface AuthUserDTO {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  imageUrl?: string;
}

export interface GoogleLoginResponseDTO {
  user: AuthUserDTO;
  accessToken: string;
  refreshToken: string;
}
export interface GoogleProfile {
  id?: string;
  name?: string;
  displayName?: string;
  emails?: Array<{ value: string }>;
  isAdmin?: boolean;
}

export interface GetMeUserDTO {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface GetMeResponseDTO {
  user: GetMeUserDTO;
}
