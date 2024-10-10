import { FastifyInstance } from "fastify";
import { TransactionController } from "../controllers/transaction/TransactionController";

export async function transactionRoutes(fastify: FastifyInstance) {
  const transactionController = new TransactionController();

  fastify.post("/transactions", (request, reply) => transactionController.create(request, reply));
  fastify.get("/transactions", (request, reply) => transactionController.getAll(request, reply));
  fastify.get("/transactions/:id", (request, reply) => transactionController.getById(request, reply));
  fastify.put("/transactions/:id", (request, reply) => transactionController.update(request, reply));
}
