import { TransactionType } from "@prisma/client";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";

interface UpdateCategoryDTO {
  id: string;
  description: string;
  type: TransactionType;
}

export class UpdateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ id, description, type }: UpdateCategoryDTO) {
    if (!description && !type) {
      throw new Error("You must update at least one field.");
    }

    return await this.categoryRepository.updateCategory(description, type, id);
  }
}
