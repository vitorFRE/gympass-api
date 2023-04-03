import { Prisma, CheckIn } from "@prisma/client";
import {prisma} from "@/lib/prisma";
import { CheckinsRepository } from "../check-in-repository";

export class PrismaCheckInsRepository implements CheckinsRepository{
  
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({data})

    return checkIn
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
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }
  async save(checkIn: CheckIn) {
    throw new Error("Method not implemented.");
  }
}