import { Request, Response, NextFunction } from "express";
import { AmbulanceService } from "./ambulanceService";

export class AmbulanceController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { instansi_id, name, police_number, level, paramedic, equipment } = req.body;

      const ambulance = await AmbulanceService.create({
        instansi_id,
        name,
        police_number,
        level,
        paramedic,
        equipment,
      });

      return res.status(200).json({
        success: true,
        message: "ambulance create successfully",
        data: { ...ambulance },
      });
    } catch (error) {
      next(error);
    }
  }
}
