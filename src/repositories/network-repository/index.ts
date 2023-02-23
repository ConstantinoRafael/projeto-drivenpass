import prisma from "../../config/database.js";
import { Prisma } from "@prisma/client";

async function getNetworks(userId: number) {
  return await prisma.network.findMany({
    where: {
      userId,
    },
  });
}

async function getSpecificNetwork(id: number, userId: number) {
  return await prisma.network.findFirst({
    where: {
      id,
      userId,
    },
  });
}

async function createNetwork(data: CreateNetworkParams) {
  return prisma.network.create({
    data,
  });
}

async function deleteNetwork(id: number, userId: number) {
  return await prisma.network.delete({
    where: {
      id,
    },
  });
}

type CreateNetworkParams = {
  userId: number;
  title: string;
  network: string;
  password: string;
};

const networksRepository = {
  createNetwork,
  getNetworks,
  getSpecificNetwork,
  deleteNetwork,
};

export default networksRepository;
