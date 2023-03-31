import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-in-repository";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository,
  ) {}

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

      const checkIn = await this.checkInsRepository.create({
        gym_id: gymId,
        user_id: userId,
      })

      return {
        checkIn
      }
    }

}