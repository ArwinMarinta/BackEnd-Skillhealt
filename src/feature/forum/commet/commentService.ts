import { prisma } from "../../../applications/database";
import { ErrorResponse } from "../../../models/error_response";
import { CommetType } from "./commentModel";

export class CommentService {
  static async create({ id, discussion_id, answer }: CommetType): Promise<CommetType> {
    const doctor = await prisma.doctor.findFirst({
      where: {
        id: id,
      },
    });
    if (!doctor) {
      throw new ErrorResponse("doctor not found", 400, ["doctor"], "doctor not found");
    }

    const comment = await prisma.comment.create({
      data: {
        doctor_id: id,
        discussion_id: discussion_id,
        answer: answer,
      },
    });

    return comment;
  }
}
