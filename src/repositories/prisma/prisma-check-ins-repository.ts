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
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })

    return count
  }
  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id
      }
    })

    return checkIn
  }
  async save(data: CheckIn) {
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id
      },
      data
    })

    return checkIn
  }
}