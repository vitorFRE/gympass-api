import { FastifyInstance } from "fastify";
import { authenticateController } from "./controllers/authenticate.controller";
import { registerController } from "./controllers/register.controller";
import { profileController } from "./controllers/profile.controller";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)

  // User can only access this route if he is authenticated
  app.get('/me', profileController)
}