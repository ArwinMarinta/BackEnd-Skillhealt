import { Request, Response, NextFunction } from "express";
import { CommentService } from "./commentService";
import { Token } from "../../../models/token_model";

export class CommentController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = res.locals.user as Token;
      const discussion_id = parseInt(req.params.discussion_id);
      const { answer } = req.body;

      const comment = await CommentService.create({
        id,
        discussion_id,
        answer,
      });

      return res.status(200).json({
        success: true,
        message: "comment create successfully",
        data: { ...comment },
      });
    } catch (error) {
      next(error);
    }
  }
}
