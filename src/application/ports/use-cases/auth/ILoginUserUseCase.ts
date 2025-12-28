export interface AuthUserLogin {
  id: string;
  name: string;
  email: string;
}
export interface LoginUserResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: AuthUserLogin;
}
export interface ILoginUser {
  execute(email: string, password: string): Promise<LoginUserResponseDTO>;
}
