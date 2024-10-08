import { Category, PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./ICategoryRepository";
import { CreateCategoryDTO } from "../../dtos/category/CreateCategoryDTO";
import { UpdateCategoryDTO } from "../../dtos/category/UpdateCategoryDTO";

const prisma = new PrismaClient();

export class CategoryRepository implements ICategoryRepository {
  async createCategory({ description, type }: CreateCategoryDTO): Promise<Category> {
    return prisma.category.create({
      data: {
        description,
        type,
      },
    });
  }

  async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany();
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async updateCategory({ description, type, id }: UpdateCategoryDTO): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: {
        description,
        type,
      },
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    return prisma.category.delete({
      where: { id },
    });
  }
}
