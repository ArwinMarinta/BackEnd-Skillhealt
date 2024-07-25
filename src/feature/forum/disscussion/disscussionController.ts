import { Request, Response, NextFunction } from "express";
import { DisscussionService } from "./disscussionService";
import { Token } from "../../../models/token_model";

export class DisscussionController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, question } = req.body;
      const { id } = res.locals.user as Token;

      const disscussion = await DisscussionService.create({ title, question, id });
      return res.status(200).json({
        success: true,
        message: "disscussion create successfully",
        data: { ...disscussion },
      });
    } catch (error) {
      next(error);
    }
  }
}
