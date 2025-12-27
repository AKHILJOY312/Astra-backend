// src/application/ports/useCases/IGetMe.ts

import { GetMeResponseDTO } from "@/application/dto/auth/authDtos";

export interface IGetMe {
  execute(userId: string): Promise<GetMeResponseDTO>;
}
