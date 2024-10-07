import { CategoryRepository } from "../../repositories/category/CategoryRepository";

export class GetAllCategoriesUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    return await this.categoryRepository.getAllCategories();
  }
}
