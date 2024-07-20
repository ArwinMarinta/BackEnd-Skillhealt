import { Request, Response, NextFunction } from "express";
import { SpecialistService } from "./specialistService";

export class SpecialistController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description } = req.body;

      const specialist = await SpecialistService.create({ name, description });

      return {
        status: true,
        message: "create in successfuly",
        data: { ...specialist },
      };
    } catch (error) {
      next(error);
    }
  }
}
