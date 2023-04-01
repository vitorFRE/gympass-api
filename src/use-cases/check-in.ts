import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-in-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository,
    private gymsRepository: GymsRepository,
  ) {}

    async execute({userId, gymId, userLatitude, userLongitude}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {

      const gym = await this.gymsRepository.findById(gymId)

      if (!gym) {
        throw new ResourceNotFoundError()
      }

      const distance = getDistanceBetweenCoordinates({latitude: userLatitude, longitude: userLongitude}, {latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()})

      const MaxDistanceInKilometers = 0.1
      if (distance > MaxDistanceInKilometers) {
        throw new Error('User is too far from the gym')
      }

      const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

      if (checkInOnSameDate) {
        throw new Error('User already checked in on this date')
      }

      const checkIn = await this.checkInsRepository.create({
        gym_id: gymId,
        user_id: userId,
      })

      return {
        checkIn
      }
    }

}