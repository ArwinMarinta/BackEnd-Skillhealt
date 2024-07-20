import { prisma } from "../../applications/database";
import { ErrorResponse } from "../../models/error_response";
import { Specialist } from "./spectialistModel";

export class SpecialistService {
  static async create({ name, description }: Specialist): Promise<Specialist> {
    const specialist = await prisma.spesialis.findFirst({
      where: {
        name: name,
      },
    });

    if (specialist) {
      throw new ErrorResponse(
        "specialist already exists",
        400,
        ["name"],
        "SPECIALIST_ALREADY_EXISTS"
      );
    }

    const createSpecialist = await prisma.spesialis.create({
      data: {
        name: name,
        description: description,
      },
    });

    return createSpecialist;
  }
}
