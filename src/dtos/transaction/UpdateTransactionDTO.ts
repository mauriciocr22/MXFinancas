import { TransactionType } from "@prisma/client";

export interface UpdateTransactionDTO {
  id: string;
  value: number;
  type: TransactionType;
  description: string;
  categoryId: string;
}
