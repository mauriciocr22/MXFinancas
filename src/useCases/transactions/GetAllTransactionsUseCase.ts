import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";

export class GetAllTransactionsUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute() {
    return await this.transactionRepository.getAllTransactions();
  }
}
