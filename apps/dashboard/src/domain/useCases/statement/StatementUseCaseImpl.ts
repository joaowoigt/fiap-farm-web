import { DashboardRepository } from "../../../data/repositories/DashboardRepository";
import { Statement } from "../../models/Statement";

export class StatementUseCaseImpl {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(accountId: string): Promise<Statement> {
    if (!accountId) {
      throw new Error("Account ID is required");
    }

    try {
      return await this.dashboardRepository.fetchStatement(accountId);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch statement data");
    }
  }
}
