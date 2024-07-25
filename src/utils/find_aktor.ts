import { prisma } from "../applications/database";

export const findUser = async (id: number) => {
  return await prisma.user.findFirst({
    where: {
      auth_id: id,
    },
  });
};

export const findDoctor = async (id: number) => {
  return await prisma.doctor.findFirst({
    where: {
      auth_id: id,
    },
  });
};

export const findInstansi = async (id: number) => {
  return await prisma.instansi.findFirst({
    where: {
      auth_id: id,
    },
  });
};
