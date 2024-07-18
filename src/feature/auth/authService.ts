import { prisma } from "../../applications/database";
import { LoginRequest, LoginResponse, RegisterType, RegisterResponse } from "./authModel";
import { Prisma } from "@prisma/client";
import { ErrorResponse } from "../../models/error_response";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword, createJwt } from "../../utils/format";

export class AuthService {
  static async login({ email, password }: LoginRequest): Promise<LoginResponse> {
    const request = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (!request) {
      throw new ErrorResponse("Invalid email or password", 400, ["email", "password"]);
    }

    const verifyPassword: Boolean = comparePassword(password, request.password);

    if (!verifyPassword) {
      throw new ErrorResponse(
        "wrong email or password",
        400,
        ["email, password"],
        "wrong email or password"
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        auth_id: request.id,
      },
    });

    if (!user) {
      throw new ErrorResponse("user not found", 404, ["user"], "wrong email or password");
    }

    const token = jwt.sign({ id: user.id, Role: request.role_id }, process.env.JWT_KEY!, {
      expiresIn: "7d",
    });

    return { token };
  }

  static async registerUser({
    full_name,
    password,
    date_birth,
    gender,
    phone_number,
    image_url,
    email,
  }: RegisterType): Promise<RegisterResponse> {
    const emails = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (emails) {
      throw new ErrorResponse(
        "Email already exists",
        400,
        ["email"],
        "EMAIL_ALREADY_EXISTS"
      );
    }

    const hash = hashPassword(password);

    const auth = await prisma.auth.create({
      data: {
        email: email,
        password: hash,
        role_id: 1,
      },
    });

    // const authUser = await prisma.auth.findUnique({
    //   where: {
    //     email: auth.email,
    //   },
    // });

    // if (!authUser) {
    //   throw new ErrorResponse("Auth not found", 400, ["auth"], "AUTH NOT FOUNT");
    // }

    const user = await prisma.user.create({
      data: {
        full_name: full_name,
        date_birth: date_birth,
        gender: gender,
        phone_number: phone_number,
        image_url: image_url,
        auth: { connect: { id: auth.id } },
      },
    });

    const data = {
      email: auth.email,
      full_name: user.full_name,
      date_birth: user.date_birth,
      gender: user.gender,
      phone_number: user.phone_number,
      image_url: user.image_url,
    };

    return data;
  }
}
