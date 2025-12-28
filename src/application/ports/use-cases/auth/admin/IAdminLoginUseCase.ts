// src/application/ports/useCases/IAdminLogin.ts

// application/dto/auth/admin/admin-user.dto.ts
export interface AdminUserDTO {
  id: string;
  email: string;
  name: string;
  isAdmin: true;
}
export interface AdminLoginResponseDTO {
  accessToken: string;
  user: AdminUserDTO;
}

export interface IAdminLogin {
  execute(email: string, password: string): Promise<AdminLoginResponseDTO>;
}
