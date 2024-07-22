import { Router } from "express";
import { AuthContoller } from "./authController";

const authRoute: Router = Router();

authRoute.post("/login", AuthContoller.login);
authRoute.post("/register", AuthContoller.registerUser);
authRoute.post("/register/doctor", AuthContoller.registerDoctor);
authRoute.post("/register/instansi", AuthContoller.registerInstansi);

export default authRoute;
