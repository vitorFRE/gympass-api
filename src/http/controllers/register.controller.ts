import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { RegisterUseCase } from "@/use-cases/register"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function registerController(request: FastifyRequest, reply: FastifyReply)  {
  const registerBodyScheme = z.object ({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodyScheme.parse(request.body)

try {
  const UsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(UsersRepository)

await registerUseCase.execute({
  name,email,password
})
} catch (err) {
  if (err instanceof UserAlreadyExistsError) {
    return reply.status(409).send({message: err.message})
  }
  
  throw err

}

  return reply.status(201).send()
}