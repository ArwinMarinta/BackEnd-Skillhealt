import { CommentController } from "./commentController";
import { Router } from "express";
import { JWTMiddleware } from "../../../middleware/jwt_middleware";

const commentRoute: Router = Router();

commentRoute.post("/:discussion_id", [
  JWTMiddleware.verifyToken,
  JWTMiddleware.doctorOnly,
  CommentController.create,
]);

export default commentRoute;
