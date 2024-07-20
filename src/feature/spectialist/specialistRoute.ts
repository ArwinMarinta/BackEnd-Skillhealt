import { Router } from "express";
import { SpecialistController } from "./specialistController";

const specialistRoute: Router = Router();

specialistRoute.post("/", SpecialistController.create);

export default specialistRoute;
