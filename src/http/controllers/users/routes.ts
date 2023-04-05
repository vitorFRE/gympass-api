import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate.controller";
import { registerController } from "./register.controller";
import { profileController } from "./profile.controller";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  // User can only access this route if he is authenticated
  app.get('/me', {onRequest: [verifyJWT]} , profileController)
}