
import { CheckIn } from "@prisma/client";
import { CheckinsRepository } from "@/repositories/check-in-repository";

interface FetchUserCHeckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCHeckInsHistoryUseCaseResponse {
 checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor (
    private checkInsRepository: CheckinsRepository ,
  ) {}

    async execute({userId,page}: FetchUserCHeckInsHistoryUseCaseRequest): Promise<FetchUserCHeckInsHistoryUseCaseResponse> {

      const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

      return {
        checkIns
      }
    }

}