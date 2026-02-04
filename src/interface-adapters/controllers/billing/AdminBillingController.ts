// src/interfaces/controllers/PlanController.ts
import { Request, Response } from "express";

import { inject, injectable } from "inversify";
import { TYPES } from "@/config/di/types";
import {
  IGetUserPaymentDetailsUseCase,
  IPaymentOverviewUseCase,
} from "@/application/ports/use-cases/upgradetopremium/admin";

@injectable()
export class AdminBillingController {
  constructor(
    @inject(TYPES.GetUserPaymentDetailsUseCase)
    private _getPaymentDetailsUC: IGetUserPaymentDetailsUseCase,

    @inject(TYPES.PaymentOverviewUseCase)
    private _getOverviewUC: IPaymentOverviewUseCase,
  ) {}

  userPaymentDetails = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const result = await this._getPaymentDetailsUC.execute(userId!);
    res.json({ succuss: true, data: result });
  };

  getPaymentOverview = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const result = await this._getOverviewUC.execute(page, limit, search);

    res.json({ success: true, data: result });
  };
}
