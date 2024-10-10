import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";
import { CreateTransactionUseCase } from "../../useCases/transactions/CreateTransactionUseCase";

import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";
import { GetAllTransactionsUseCase } from "../../useCases/transactions/GetAllTransactionsUseCase";
import { GetTransactionByIdUseCase } from "../../useCases/transactions/GetTransactionByIdUseCase";
import { UpdateTransactionUseCase } from "../../useCases/transactions/UpdateTransactionUseCase";
import { UpdateTransactionDTO } from "../../dtos/transaction/UpdateTransactionDTO";
import { DeleteTransactionUseCase } from "../../useCases/transactions/DeleteTransactionUseCase";

export class TransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;
  private getAllTransactionsUseCase: GetAllTransactionsUseCase;
  private getTransactionByIdUseCase: GetTransactionByIdUseCase;
  private updateTransactionUseCase: UpdateTransactionUseCase;
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor() {
    const transactionRepository = new TransactionRepository();
    const catetgoryRepository = new CategoryRepository();

    this.createTransactionUseCase = new CreateTransactionUseCase(transactionRepository, catetgoryRepository);
    this.getAllTransactionsUseCase = new GetAllTransactionsUseCase(transactionRepository);
    this.getTransactionByIdUseCase = new GetTransactionByIdUseCase(transactionRepository);
    this.updateTransactionUseCase = new UpdateTransactionUseCase(transactionRepository);
    this.deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);
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

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transactions = await this.getAllTransactionsUseCase.execute();
      reply.status(200).send(transactions);
    } catch (error) {
      reply.status(400).send({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };

      const transaction = await this.getTransactionByIdUseCase.execute(id);

      reply.status(200).send(transaction);
    } catch (error) {
      reply.status(400).send({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as UpdateTransactionDTO;
      const { value, type, description, categoryId } = request.body as UpdateTransactionDTO;

      const updatedTransaction = await this.updateTransactionUseCase.execute({ id, value, type, description, categoryId });

      reply.status(200).send(updatedTransaction);
    } catch (error) {
      reply.status(400).send({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const deletedTransaction = await this.deleteTransactionUseCase.execute(id);

      reply.status(200).send(`Deleted transaction with the '${deletedTransaction.description}' description successfuly.`);
    } catch (error) {
      reply.status(400).send({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
}
