
import { CheckinsRepository } from "@/repositories/check-in-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
 checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository ,
  ) {}

    async execute({userId}: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {

      const checkInsCount = await this.checkInsRepository.countByUserId(userId)

      return {
        checkInsCount
      }
    }

}