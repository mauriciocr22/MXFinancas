import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { CreateCategoryUseCase } from "../../useCases/categories/CreateCategoryUseCase";
import { TransactionType } from "@prisma/client";
import { DeleteCategoryUseCase } from "../../useCases/categories/DeleteCategoryUseCase";
import { UpdateCategoryUseCase } from "../../useCases/categories/UpdateCategoryUseCase";
import { GetCategoryByIdUseCase } from "../../useCases/categories/GetCategoryByIdUseCase";

export class CategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;
  private deleteCategoryUseCase: DeleteCategoryUseCase;
  private updateCategoryUseCase: UpdateCategoryUseCase;
  private getCategoryByIdUseCase: GetCategoryByIdUseCase;

  constructor() {
    const categoryRepository = new CategoryRepository();
    this.createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
    this.deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
    this.updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
    this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(
      categoryRepository
    );
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { description, type } = request.body as {
        description: string;
        type: TransactionType;
      };

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

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const category = await this.getCategoryByIdUseCase.execute({ id });
      reply.status(201).send(category);
    } catch (error) {
      reply.status(400).send({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const deletedCategory = await this.deleteCategoryUseCase.execute({ id });
      reply
        .status(200)
        .send(
          `Deleted the category with '${deletedCategory.description}' description successfully.`
        );
    } catch (error) {
      reply.status(400).send({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { description, type } = request.body as {
        description: string;
        type: TransactionType;
      };

      const updatedCategory = await this.updateCategoryUseCase.execute({
        id,
        description,
        type,
      });

      reply.status(200).send(updatedCategory);
    } catch (error) {
      reply.status(400).send({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
}
