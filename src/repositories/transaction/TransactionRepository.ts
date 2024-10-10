import { PrismaClient, Transaction } from "@prisma/client";
import { ITransactionRepository } from "./ITransactionRepository";

import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";
import { UpdateTransactionDTO } from "../../dtos/transaction/UpdateTransactionDTO";

const prisma = new PrismaClient();

export class TransactionRepository implements ITransactionRepository {
  async createTransaction({ value, type, description, categoryId }: CreateTransactionDTO): Promise<Transaction> {
    return prisma.transaction.create({
      data: {
        value,
        type,
        description,
        categoryId,
      },
    });
  }

  async getAllTransactions(): Promise<Transaction[]> {
    return prisma.transaction.findMany();
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  async updateTransaction({ id, value, type, description, categoryId }: UpdateTransactionDTO): Promise<Transaction> {
    return prisma.transaction.update({
      where: {
        id,
      },
      data: {
        value,
        type,
        description,
        categoryId,
      },
    });
  }
}
