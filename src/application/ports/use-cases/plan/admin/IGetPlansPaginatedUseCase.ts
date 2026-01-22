// src/application/ports/useCases/IGetPlansPaginated.ts

import { Plan } from "@/domain/entities/billing/Plan";

// import { Plan } from "@/domain/entities/billing/Plan";
// import { PlanResponseDTO } from "./ICreatePlanUseCase"; // reuse

export interface AdminPlanDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  finalAmount: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  features: string[];
  maxProjects: number;
  maxMembersPerProject: number;
  isActive: boolean;
}

// export interface PaginatedResponseDTO<T> {
//   data: T[];
//   total: number;
//   page: number;
//   totalPages: number;
//   hasMore: boolean;
// }
export interface PaginatedResponseDTO {
  plans: Plan[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}

export interface IGetPlansPaginated {
  execute(page?: number, limit?: number): Promise<PaginatedResponseDTO>;
}
