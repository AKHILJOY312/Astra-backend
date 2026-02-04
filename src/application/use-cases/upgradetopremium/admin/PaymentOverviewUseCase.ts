// src/application/use-cases/billing/PaymentOverviewUseCase.ts

import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";

import { IPaymentRepository } from "@/application/ports/repositories/IPaymentRepository";
import {
  IPaymentOverviewUseCase,
  PaymentOverviewOutput,
} from "@/application/ports/use-cases/upgradetopremium/admin";

@injectable()
export class PaymentOverviewUseCase implements IPaymentOverviewUseCase {
  constructor(
    @inject(TYPES.PaymentRepository) private _paymentRepo: IPaymentRepository,
  ) {}

  async execute(
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaymentOverviewOutput> {
    // 1. Fetch data through the repository's optimized overview method
    const { data, total, totalRevenue } =
      await this._paymentRepo.getPaymentsOverview(page, limit, search);

    // 2. Map raw database results to a clean Overview Item structure
    const users = data.map((item: any) => ({
      userId: item.userId,
      userName: item.userName,
      userEmail: item.userEmail,
      planName: item.planName || "N/A",
      subscriptionStatus: item.status || "inactive",
      totalSpent: item.totalSpent || 0,
      lastPaymentDate: item.lastPaymentDate,
      failedAttemptCount: item.failedCount || 0,
    }));

    return {
      users,
      totalRevenue,
      activeSubscriptions: total, // Representing total count in search/filter
      totalUsers: total,
    };
  }
}
