// application/use-cases/billing/SoftDeletePlan.ts
import { IPlanRepository } from "../../../ports/repositories/IPlanRepository";
import { DeletePlanDto } from "../../../dto/plan/DeletePlanDto";
import { Plan } from "../../../../domain/entities/billing/Plan";
import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";
import { ISoftDeletePlan } from "@/application/ports/use-cases/plan/admin/ISoftDeletePlanUseCase";

@injectable()
export class SoftDeletePlan implements ISoftDeletePlan {
  constructor(
    @inject(TYPES.PlanRepository) private _planRepo: IPlanRepository,
  ) {}

  async execute(dto: DeletePlanDto): Promise<Plan | null> {
    const deletedPlan = await this._planRepo.delete(dto.id);
    return deletedPlan;
  }
}
