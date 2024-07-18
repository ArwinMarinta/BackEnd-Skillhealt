import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../utils/error_handler";
import { prisma } from "../../applications/database";
import { AuthService } from "./authService";

export class AuthContoller {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      return res.status(200).json({
        success: true,
        message: "Login in successfully",
        data: { ...token },
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { full_name, password, date_birth, gender, phone_number, image_url, email } =
        req.body;

      const user = await AuthService.registerUser({
        full_name,
        password,
        date_birth,
        gender,
        phone_number,
        image_url,
        email,
      });

      return res.status(201).json({
        success: true,
        message: "Register in successfully",
        data: { ...user },
      });
    } catch (error) {
      next(error);
    }
  }
}
