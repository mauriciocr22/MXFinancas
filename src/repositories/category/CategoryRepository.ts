import { Category, TransactionType, PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./ICategoryRepository";

const prisma = new PrismaClient();

export class CategoryRepository implements ICategoryRepository {
  async createCategory(
    description: string,
    type: TransactionType
  ): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        description,
        type,
      },
    });

    return category;
  }

  async deleteCategory(id: string): Promise<Category> {
    return await prisma.category.delete({
      where: { id },
    });
  }

  async updateCategory(
    description: string,
    type: TransactionType,
    id: string
  ): Promise<Category> {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        description,
        type,
      },
    });

    return updatedCategory;
  }
}
