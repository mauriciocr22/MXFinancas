import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";
import { CreateTransactionDTO } from "../../dtos/transaction/CreateTransactionDTO";
import { CategoryRepository } from "../../repositories/category/CategoryRepository";

export class CreateTransactionUseCase {
  private transactionRepository: TransactionRepository;
  private categoryRepository: CategoryRepository;

  constructor(transactionRepository: TransactionRepository, categoryRepository: CategoryRepository) {
    this.transactionRepository = transactionRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute({ value, type, description, categoryId }: CreateTransactionDTO) {
    if (!categoryId || !description || !type || !value) {
      throw new Error("Please inform all the requiring fields.");
    }

    if (!this.categoryRepository.getCategoryById(categoryId)) {
      throw new Error("Category not found.");
    }

    return await this.transactionRepository.createTransaction({ value, type, description, categoryId });
  }
}
