import { makeFetchUserCheckInHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-in-history-use-case"
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function searchController(request: FastifyRequest, reply: FastifyReply)  {
  const checkInHistoryQuerySchema = z.object ({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { page} = checkInHistoryQuerySchema.parse(request.query)

  const fetchUserCheckInHistoryUseCase = makeFetchUserCheckInHistoryUseCase()

const { checkIns } = await fetchUserCheckInHistoryUseCase.execute({
  userId: request.user.sub,
  page
})


  return reply.status(200).send({
    checkIns
  })
}