import { TransactionType } from "@prisma/client";

export interface UpdateCategoryDTO {
  description: string;
  type: TransactionType;
  id: string;
}
