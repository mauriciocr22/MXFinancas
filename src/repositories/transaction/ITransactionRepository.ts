import { Transaction } from "@prisma/client";
import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";

export interface ITransactionRepository {
  createTransaction(data: CreateTransactionDTO): Promise<Transaction>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(id: string): Promise<Transaction | null>;
}
