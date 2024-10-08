import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";
import { CreateTransactionUseCase } from "../../useCases/transactions/CreateTransactionUseCase";

import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";

export class TransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;

  constructor() {
    const transactionRepository = new TransactionRepository();
    const catetgoryRepository = new CategoryRepository();

    this.createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, catetgoryRepository);
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { value, type, description, categoryId } = request.body as CreateTransactionDTO;

      const transaction = await this.createTransactionUseCase.execute({ value, type, description, categoryId });

      reply.status(201).send(transaction);
    } catch (error) {
      reply.status(400).send({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
}
