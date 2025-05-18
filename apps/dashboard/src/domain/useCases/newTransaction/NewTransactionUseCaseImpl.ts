import { DashboardRepository } from "../../../data/repositories/DashboardRepository";
import { NewTransactionUseCase } from "./NewTransactionUseCase";

export class NewTransactionUseCaseImpl implements NewTransactionUseCase {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async execute(
    value: number,
    type: string,
    accountId: string
  ): Promise<boolean> {
    try {
      const response = await this.dashboardRepository.addTransaction(
        value,
        type,
        accountId
      );
      return response;
    } catch (error) {
      console.error("Error adding transaction:", error);
      throw new Error("Error adding transaction:");
    }
  }
}
