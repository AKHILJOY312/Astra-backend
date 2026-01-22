// src/application/use-cases/plan/GetAvailablePlansUseCase.ts

import { inject, injectable } from "inversify";
import { IPlanRepository } from "../../../ports/repositories/IPlanRepository";
// import { Plan } from "@/domain/entities/billing/Plan";
import { TYPES } from "@/config/di/types";
import {
  AvailablePlanDTO,
  IGetAvailablePlansUseCase,
} from "@/application/ports/use-cases/plan/user/IGetAvailablePlansUseCase";
import { IUserSubscriptionRepository } from "@/application/ports/repositories/IUserSubscriptionRepository";

@injectable()
export class GetAvailablePlansUseCase implements IGetAvailablePlansUseCase {
  constructor(
    @inject(TYPES.PlanRepository) private planRepo: IPlanRepository,
    @inject(TYPES.UserSubscriptionRepository)
    private subscriptRepo: IUserSubscriptionRepository
  ) {}

  async execute(userId: string): Promise<AvailablePlanDTO[]> {
    const [plans, activeSub] = await Promise.all([
      this.planRepo.findAllActive(),
      this.subscriptRepo.findActiveByUserId(userId),
    ]);

    const isPaidUser = activeSub !== null && activeSub.planType !== "free";

    return plans
      .filter((plan) => !(isPaidUser && plan.id === "free"))
      .sort((a, b) => a.finalAmount - b.finalAmount)
      .map((plan) => ({
        id: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price,
        finalAmount: plan.finalAmount,
        features: plan.features,
        maxProjects: plan.maxProjects,
        maxMembersPerProject: plan.maxMembersPerProject,
        isCurrent: activeSub?.planType === plan.id,
      }));
  }
}
