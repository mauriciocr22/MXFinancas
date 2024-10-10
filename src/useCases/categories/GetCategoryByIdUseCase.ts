import { CategoryRepository } from "../../repositories/category/CategoryRepository";

export class GetCategoryByIdUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: string) {
    if (!id) {
      throw new Error("Please inform an ID.");
    }

    const category = await this.categoryRepository.getCategoryById(id);

    if (!category) throw new Error("Category not found.");

    return category;
  }
}
