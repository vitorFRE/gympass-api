import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { registerController } from "./register.controller";
import { profileController } from "./profile.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  app.patch('/token/refresh', refresh)

  // User can only access this route if he is authenticated
  app.get('/me', {onRequest: [verifyJWT]} , profileController)
}