import { TransactionType } from "@prisma/client";

export interface CreateTransactionDTO {
  value: number;
  type: TransactionType;
  description: string;
  categoryId: string;
}
