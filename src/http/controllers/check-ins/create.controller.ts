import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case"
import { makeCreateGymsUseCase } from "@/use-cases/factories/make-create-gym-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function createController(request: FastifyRequest, reply: FastifyReply)  {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodyScheme = z.object ({
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })
  
  const { gymId} = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude} = createCheckInBodyScheme.parse(request.body)

  const createGymUseCase = makeCheckInUseCase()

await createGymUseCase.execute({
  gymId,
  userId: request.user.sub,
  userLatitude: latitude,
  userLongitude: longitude
})


  return reply.status(201).send()
}