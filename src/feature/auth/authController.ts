import { Request, Response, NextFunction } from "express";
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

  static async registerUser(req: Request, res: Response, next: NextFunction) {
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

  static async registerDoctor(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        email,
        password,
        spesialis_id,
        instansi_id,
        name,
        phone_number,
        registration_certificate,
        experience,
        education,
        image_url,
        description,
        status,
      } = req.body;

      const doctor = await AuthService.registerDoctor({
        email,
        password,
        spesialis_id,
        instansi_id,
        name,
        phone_number,
        registration_certificate,
        experience,
        education,
        image_url,
        description,
        status,
      });

      return res.status(201).json({
        success: true,
        message: "Register in successfully",
        data: { ...doctor },
      });
    } catch (error) {
      next(error);
    }
  }
  static async registerInstansi(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, name, address, phone_number, image_url } = req.body;

      const instansi = await AuthService.RegisterInstansi({
        email,
        password,
        name,
        address,
        phone_number,
        image_url,
      });
      return res.status(201).json({
        success: true,
        message: "Register in successfully",
        data: { ...instansi },
      });
    } catch (error) {
      next(error);
    }
  }
}
