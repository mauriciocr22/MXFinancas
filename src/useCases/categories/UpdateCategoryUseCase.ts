import { CategoryRepository } from "../../repositories/category/CategoryRepository";
import { UpdateCategoryDTO } from "../../dtos/category/UpdateCategoryDTO";

export class UpdateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ id, description, type }: UpdateCategoryDTO) {
    if (!(await this.categoryRepository.getCategoryById(id))) {
      throw new Error("The category you are trying to update was not found.");
    }

    if (!description && !type) {
      throw new Error("You must update at least one field.");
    }

    return await this.categoryRepository.updateCategory({ description, type, id });
  }
}
