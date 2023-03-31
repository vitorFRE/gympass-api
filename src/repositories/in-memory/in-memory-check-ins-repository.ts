import { CheckIn, Prisma } from "@prisma/client";
import { CheckinsRepository } from "../check-in-repository";
import { randomUUID } from "node:crypto";

export class InMemoryCheckInsRepository implements CheckinsRepository {
  public items: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}