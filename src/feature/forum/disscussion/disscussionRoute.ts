import { DisscussionController } from "./disscussionController";
import { Router } from "express";
import { JWTMiddleware } from "../../../middleware/jwt_middleware";

const disscussionRoute: Router = Router();

disscussionRoute.post("/", [JWTMiddleware.verifyToken, DisscussionController.create]);

export default disscussionRoute;
