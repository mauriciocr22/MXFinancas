import { Category } from "@prisma/client";
import { CreateCategoryDTO } from "../../dtos/category/CreateCategoryDTO";
import { UpdateCategoryDTO } from "../../dtos/category/UpdateCategoryDTO";

export interface ICategoryRepository {
  createCategory(data: CreateCategoryDTO): Promise<Category>;
  getAllCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(data: UpdateCategoryDTO): Promise<Category>;
  deleteCategory(id: string): Promise<Category>;
}
