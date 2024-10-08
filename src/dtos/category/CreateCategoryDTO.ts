import { TransactionType } from "@prisma/client";

export interface CreateCategoryDTO {
  description: string;
  type: TransactionType;
}
