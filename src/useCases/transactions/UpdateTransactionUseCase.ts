import { UpdateTransactionDTO } from "../../dtos/transaction/UpdateTransactionDTO";
import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";

export class UpdateTransactionUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute({ id, value, type, description, categoryId }: UpdateTransactionDTO) {
    if (!(await this.transactionRepository.getTransactionById(id))) {
      throw new Error("The transaction you are trying to update was not found.");
    }

    if (!value && !description && !type && !categoryId) {
      throw new Error("You must update at least one field.");
    }

    return await this.transactionRepository.updateTransaction({ id, value, type, description, categoryId });
  }
}
