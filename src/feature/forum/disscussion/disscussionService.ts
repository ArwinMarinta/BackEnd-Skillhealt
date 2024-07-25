import { prisma } from "../../../applications/database";
import { ErrorResponse } from "../../../models/error_response";
import { DisscussionRequest } from "./disscussionModel";

export class DisscussionService {
  static async create({
    title,
    question,
    id,
  }: DisscussionRequest): Promise<DisscussionRequest> {
    const disscussion = await prisma.discussion.create({
      data: {
        title,
        question,
        user_id: id,
      },
    });

    return disscussion;
  }
}
