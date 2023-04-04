import { Prisma } from "@prisma/client";
import { FindManyNearByParams, GymsRepository } from "../gyms-repository";
import { prisma } from "@/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {id}
    })

    return gym
  }
  async create(data: Prisma.GymCreateInput) {
    throw new Error("Method not implemented.");
  }
  async searchMany(query: string, page: number) {
    throw new Error("Method not implemented.");
  }
  async findManyNearby(params: FindManyNearByParams) {
    throw new Error("Method not implemented.");
  }

}