// src/application/ports/useCases/IGoogleLogin.ts
import {
  GoogleLoginResponseDTO,
  GoogleProfile,
} from "@/application/dto/auth/authDtos";

export interface IGoogleLogin {
  execute(profile: GoogleProfile): Promise<GoogleLoginResponseDTO>;
}
