import { FastifyInstance } from "fastify";
import { TransactionController } from "../controllers/transaction/transactionController";

export async function transactionRoutes(fastify: FastifyInstance) {
  const transactionController = new TransactionController();

  fastify.post("/transactions", (request, reply) => transactionController.create(request, reply));
}
