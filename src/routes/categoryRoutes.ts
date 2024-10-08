import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category/CategoryController";

export async function categoryRoutes(fastify: FastifyInstance) {
  const categoryController = new CategoryController();

  fastify.post("/categories", (request, reply) => categoryController.create(request, reply));

  fastify.get("/categories", (request, reply) => categoryController.getAll(request, reply));

  fastify.get("/categories/:id", (request, reply) => categoryController.getById(request, reply));

  fastify.put("/categories/:id", (request, reply) => categoryController.update(request, reply));

  fastify.delete("/categories/:id", (request, reply) => categoryController.delete(request, reply));
}
