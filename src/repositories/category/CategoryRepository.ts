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
}
