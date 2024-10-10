import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";

export class DeleteTransactionUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(id: string) {
    if (!id) {
      throw new Error("Please inform an ID.");
    }

    if (!(await this.transactionRepository.getTransactionById(id))) {
      throw new Error("Transaction not found.");
    }

    const deletedTransaction = await this.transactionRepository.deleteTransaction(id);

    return deletedTransaction;
  }
}
