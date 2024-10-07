import { TransactionType } from "@prisma/client";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";

// Data Transfer Object
interface CreateCategoryDTO {
  description: string;
  type: TransactionType;
}

export class CreateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ description, type }: CreateCategoryDTO) {
    if (!description || !type) {
      throw new Error("Description and type are required.");
    }

    if (type !== TransactionType.EXPENSE && type !== TransactionType.INCOME) {
      throw new Error(
        "Invalid transaction type. Must be either 'INCOME' or 'EXPENSE'."
      );
    }

    const category = await this.categoryRepository.createCategory(
      description,
      type
    );
    return category;
  }
}
