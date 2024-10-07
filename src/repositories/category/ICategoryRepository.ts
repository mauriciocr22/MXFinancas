import { Category, TransactionType } from "@prisma/client";

export interface ICategoryRepository {
  createCategory(description: string, type: TransactionType): Promise<Category>;
  updateCategory(
    description: string,
    type: TransactionType,
    id: string
  ): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
  getCategoryById(id: string): Promise<Category | null>;
}
