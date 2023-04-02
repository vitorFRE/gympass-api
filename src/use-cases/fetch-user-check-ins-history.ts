
import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-in-repository";

interface FetchUserCHeckInsHistoryUseCaseRequest {
  userId: string;
}

interface FetchUserCHeckInsHistoryUseCaseResponse {
 checkIns: CheckIn[];
}

export class FetchUserCHeckInsHistoryUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository ,
  ) {}

    async execute({userId}: FetchUserCHeckInsHistoryUseCaseRequest): Promise<FetchUserCHeckInsHistoryUseCaseResponse> {

      const checkIns = await this.checkInsRepository.findManyByUserId(userId)

      return {
        checkIns
      }
    }

}