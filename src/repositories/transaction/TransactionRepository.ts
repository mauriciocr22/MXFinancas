import { PrismaClient, Transaction } from "@prisma/client";
import { ITransactionRepository } from "./ITransactionRepository";

import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";

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
}
