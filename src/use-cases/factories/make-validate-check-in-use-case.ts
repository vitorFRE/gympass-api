import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { CheckInValidateUseCase } from "../validate-check-in"

export function makeCheckInValidateUseCase () {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new CheckInValidateUseCase(checkInsRepository)

  return useCase
}