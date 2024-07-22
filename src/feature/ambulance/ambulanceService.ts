import { prisma } from "../../applications/database";
import { AmbulanceType } from "./ambulanceModel";
import { ErrorResponse } from "../../models/error_response";
import { LevelType } from "@prisma/client";

export class AmbulanceService {
  static async create({
    instansi_id,
    name,
    police_number,
    level,
    paramedic,
    equipment,
  }: AmbulanceType): Promise<AmbulanceType> {
    const ambulance = await prisma.ambulance.findFirst({
      where: {
        instansi_id,
        name,
      },
    });

    if (ambulance) {
      throw new ErrorResponse(
        "name already exists",
        400,
        ["name_ambulance"],
        "NAME_ALREADY_EXISTS"
      );
    }

    const validLevels = Object.values(LevelType);

    if (!validLevels.includes(level as LevelType)) {
      throw new ErrorResponse(
        `Invalid level: ${level}. Valid levels are ${validLevels.join(", ")}.`,
        400,
        ["level"],
        "INVALID_LEVEL"
      );
    }

    const create = await prisma.ambulance.create({
      data: {
        instansi_id,
        name,
        police_number,
        level: level as LevelType,
        paramedic,
        equipment,
      },
    });

    return create;
  }
}
