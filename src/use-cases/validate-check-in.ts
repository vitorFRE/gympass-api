import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import dayjs from "dayjs";
import { CheckInExpiredError } from "./errors/check-in-expired-error";

interface CheckInValidateUseCaseRequest {
  checkInId: string
}

interface CheckInValidateUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInValidateUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository,
  ) {}

    async execute({checkInId}: CheckInValidateUseCaseRequest): Promise<CheckInValidateUseCaseResponse> {

      const checkIn = await this.checkInsRepository.findById(checkInId)

      if (!checkIn) {
        throw new ResourceNotFoundError()
      }

      const distanceInMinutosFromCheckInCreation = dayjs(new Date()).diff(checkIn.createdAt, 'minute')

      if (distanceInMinutosFromCheckInCreation > 20) {
        throw new CheckInExpiredError()
      }

      checkIn.validated_at = new Date()

      await this.checkInsRepository.save(checkIn)

      return {
        checkIn
      }
    }

}