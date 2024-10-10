import { Transaction } from "@prisma/client";
import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";
import { UpdateTransactionDTO } from "../../dtos/transaction/UpdateTransactionDTO";

export interface ITransactionRepository {
  createTransaction(data: CreateTransactionDTO): Promise<Transaction>;
  getAllTransactions(): Promise<Transaction[]>;
  getTransactionById(id: string): Promise<Transaction | null>;
  updateTransaction(data: UpdateTransactionDTO): Promise<Transaction>;
  deleteTransaction(id: string): Promise<Transaction>;
}
