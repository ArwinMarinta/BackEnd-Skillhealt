import { Router } from "express";
import { AuthContoller } from "./authController";
import { deflate } from "zlib";

const authRoute: Router = Router();

authRoute.post("/login", AuthContoller.login);
authRoute.post("/register", AuthContoller.register);

export default authRoute;
