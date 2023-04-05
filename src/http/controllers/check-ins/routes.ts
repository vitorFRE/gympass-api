import { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { createController } from "./create.controller";
import { validateController } from "./validate.controller";
import { metricsController } from "./metrics.controller";
import { historyController } from "./history.controller";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', historyController)
  app.get('/check-ins/metrics', metricsController)
  app.post('/gyms/:gymId/check-ins', createController)
  app.patch('/check-ins/:checkInId/validate', validateController)
}