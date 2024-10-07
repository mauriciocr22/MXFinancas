import { Category, TransactionType, PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./ICategoryRepository";

const prisma = new PrismaClient();

export class CategoryRepository implements ICategoryRepository {
  async createCategory(
    description: string,
    type: TransactionType
  ): Promise<Category> {
    return prisma.category.create({
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

  async updateCategory(
    description: string,
    type: TransactionType,
    id: string
  ): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: {
        description,
        type,
      },
    });
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }
}
