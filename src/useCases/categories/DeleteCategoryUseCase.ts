import { CategoryRepository } from "../../repositories/category/CategoryRepository";

export class DeleteCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(id: string) {
    if (!id) {
      throw new Error("Please inform an ID.");
    }

    if (!(await this.categoryRepository.getCategoryById(id))) {
      throw new Error("Category not found.");
    }

    const deletedCategory = await this.categoryRepository.deleteCategory(id);

    return deletedCategory;
  }
}
