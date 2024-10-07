import { CategoryRepository } from "../../repositories/category/CategoryRepository";

interface DeleteCategoryDTO {
  id: string;
}

export class DeleteCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ id }: DeleteCategoryDTO) {
    if (!(await this.categoryRepository.getCategoryById(id))) {
      throw new Error("Category not found.");
    }

    const deletedCategory = await this.categoryRepository.deleteCategory(id);

    return deletedCategory;
  }
}
