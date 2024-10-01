import { Category, TransactionType } from "@prisma/client";

export interface ICategoryRepository {
  createCategory(description: string, type: TransactionType): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
}
