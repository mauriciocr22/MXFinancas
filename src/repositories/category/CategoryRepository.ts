import { Category, TransactionType, PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./ICategoryRepository";

const prisma = new PrismaClient();

export class CategoryRepository implements ICategoryRepository {
  async createCategory(
    description: string,
    type: TransactionType
  ): Promise<Category> {
    if (type !== TransactionType.INCOME && type !== TransactionType.EXPENSE) {
      throw new Error("Invalid transaction type");
    }

    const category = await prisma.category.create({
      data: {
        description,
        type,
      },
    });

    return category;
  }

  async deleteCategory(id: string): Promise<Category> {
    try {
      const deletedCategory = await prisma.category.delete({
        where: { id },
      });

      return deletedCategory;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Category with ID ${id} could not be deleted. ${error.message}`
        );
      } else {
        throw new Error(`Category with ID ${id} could not be deleted.`);
      }
    }
  }
}
