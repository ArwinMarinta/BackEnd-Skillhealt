import { Router } from "express";
import { AmbulanceController } from "./ambulanceController";

const ambulanceRoute: Router = Router();

ambulanceRoute.post("/", AmbulanceController.create);

export default ambulanceRoute;
