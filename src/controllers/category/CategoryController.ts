import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { CreateCategoryUseCase } from "../../useCases/categories/CreateCategoryUseCase";
import { TransactionType } from "@prisma/client";

export class CategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor() {
    const categoryRepository = new CategoryRepository();
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { description, type } = request.body as {
        description: string;
        type: TransactionType;
      };
      if (
        type !== TransactionType.EXPENSE ||
        type !== TransactionType.EXPENSE
      ) {
        throw new Error(
          "Invalid transaction type. Must be either 'INCOME' or 'EXPENSE'."
        );
      }

      const category = await this.createCategoryUseCase.execute({
        description,
        type,
      });
      console.log("Category created successfully!");
      reply.status(201).send(category);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({ error: error.message });
      } else {
        reply.status(400).send({ error: "An unexpected error occurred." });
      }
    }
  }
}
