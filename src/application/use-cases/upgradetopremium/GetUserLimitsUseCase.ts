// src/core/use-cases/subscription/GetUserLimitsUseCase.ts
import { IProjectRepository } from "../../ports/repositories/IProjectRepository";
import { IProjectMembershipRepository } from "../../ports/repositories/IProjectMembershipRepository";
import { IUserSubscriptionRepository } from "../../ports/repositories/IUserSubscriptionRepository";
import { IPlanRepository } from "../../ports/repositories/IPlanRepository";
import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";
import {
  IGetUserLimitsUseCase,
  UserLimitsDTO,
} from "@/application/ports/use-cases/upgradetopremium/IGetUserLimitsUseCase";

@injectable()
export class GetUserLimitsUseCase implements IGetUserLimitsUseCase {
  constructor(
    @inject(TYPES.ProjectRepository) private _projectRepo: IProjectRepository,
    @inject(TYPES.ProjectMembershipRepository)
    private _membershipRepo: IProjectMembershipRepository,
    @inject(TYPES.UserSubscriptionRepository)
    private _subscriptionRepo: IUserSubscriptionRepository,
    @inject(TYPES.PlanRepository) private _planRepo: IPlanRepository,
  ) {}

  async execute(userId: string, projectId?: string): Promise<UserLimitsDTO> {
    const projectCount = await this._projectRepo.countByOwnerId(userId);
    const subscription =
      await this._subscriptionRepo.findActiveByUserId(userId);
    const plan = await this._planRepo.findById(
      subscription?.planType || "free",
    );

    const limits = {
      currentProjects: projectCount,
      maxProjects: plan?.maxProjects || 5,
      maxMembersPerProject: plan?.maxMembersPerProject || 5,
      planType: subscription?.planType || "free",
      currentMembersInProject: projectId
        ? await this._membershipRepo.countMembersInProject(projectId)
        : undefined,
      canCreateProject: projectCount < (plan?.maxProjects || 5),
      canAddMember:
        !projectId ||
        (await this._membershipRepo.countMembersInProject(projectId)) <
          (plan?.maxMembersPerProject || 5),
    };

    return limits;
  }
}
