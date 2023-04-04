import { Gym, Prisma } from "@prisma/client";
import { FindManyNearByParams, GymsRepository } from "../gyms-repository";

export class PrismaGymsRepository implements GymsRepository {
  
  async findById(id: string) {
    throw new Error("Method not implemented.");
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