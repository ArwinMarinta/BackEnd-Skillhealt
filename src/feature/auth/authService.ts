import { prisma } from "../../applications/database";
import {
  LoginRequest,
  LoginResponse,
  RegisterType,
  RegisterResponse,
  RegisterDoctorRequest,
  RegisterDoctorResponse,
  RegisterInstansiRequest,
  RegisterInstasiResponse,
} from "./authModel";
import { Prisma } from "@prisma/client";
import { ErrorResponse } from "../../models/error_response";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword, createJwt } from "../../utils/format";
import { connect } from "http2";

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

    const role = await prisma.role.findFirst({
      where: {
        id: request.role_id,
      },
    });

    if (!role) {
      throw new ErrorResponse("Role Not Found", 404, ["role"], "role not found");
    }

    const token = jwt.sign({ id: user?.id, Role: role.name }, process.env.JWT_KEY!, {
      expiresIn: "7d",
    });

    const data = {
      token: token,
      role: role.name,
    };

    return data;
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

  static async registerDoctor({
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
  }: RegisterDoctorRequest): Promise<RegisterDoctorResponse> {
    const exitingEmail = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (exitingEmail) {
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
        role_id: 2,
      },
    });

    const doctor = await prisma.doctor.create({
      data: {
        name: name,
        phone_number: phone_number,
        registration_certificate: registration_certificate,
        experience: experience,
        education: education,
        image_url: image_url,
        description: description,
        status: false,
        auth: {
          connect: { id: auth.id },
        },
        spesialis: {
          connect: { id: spesialis_id },
        },
        instansi: {
          connect: { id: instansi_id },
        },
      },
    });

    const data = {
      email: auth.email,
      name: doctor.name,
      phone_number: doctor.phone_number,
      registration_certificate: registration_certificate,
    };

    return data;
  }

  static async RegisterInstansi({
    email,
    password,
    name,
    address,
    phone_number,
    image_url,
  }: RegisterInstansiRequest): Promise<RegisterInstasiResponse> {
    const checkEmail = await prisma.auth.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
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
        role_id: 3,
      },
    });

    const instansi = await prisma.instansi.create({
      data: {
        name,
        address,
        phone_number,
        image_url,
        auth: {
          connect: { id: auth.id },
        },
      },
    });

    const data = {
      email: auth.email,
      name: instansi.name,
      address: instansi.address,
      phone_number: instansi.phone_number,
      image_url: instansi.image_url,
    };

    return data;
  }
}
