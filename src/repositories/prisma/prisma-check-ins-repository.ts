import { Prisma, CheckIn } from "@prisma/client";
import { CheckinsRepository } from "../check-in-repository";

export class PrismaCheckInsRepository implements CheckinsRepository{
  
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    throw new Error("Method not implemented.");
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    throw new Error("Method not implemented.");
  }
  async findManyByUserId(userId: string, page: number) {
    throw new Error("Method not implemented.");
  }
  async countByUserId(userId: string) {
    throw new Error("Method not implemented.");
  }
  async findById(id: string) {
    throw new Error("Method not implemented.");
  }
  async save(checkIn: CheckIn) {
    throw new Error("Method not implemented.");
  }
}