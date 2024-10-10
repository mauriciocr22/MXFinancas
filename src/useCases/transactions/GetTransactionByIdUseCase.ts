import { TransactionRepository } from "../../repositories/transaction/TransactionRepository";

export class GetTransactionByIdUseCase {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  async execute(id: string) {
    if (!id) {
      throw new Error("Please inform an ID.");
    }

    const transaction = await this.transactionRepository.getTransactionById(id);

    if (!transaction) {
      throw new Error("Transaction was not found.");
    }

    return transaction;
  }
}
