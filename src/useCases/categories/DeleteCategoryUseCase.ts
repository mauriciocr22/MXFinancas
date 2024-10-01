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
    if (!id) {
      throw new Error("ID is required to delete a category.");
    }

    const deletedCategory = await this.categoryRepository.deleteCategory(id);

    return deletedCategory;
  }
}
