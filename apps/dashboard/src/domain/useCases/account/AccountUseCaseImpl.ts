import { DashboardRepository } from "../../../data/repositories/DashboardRepository";
import { Account } from "../../models/Account";

export class AccountUseCaseImpl {
  constructor(private dashboardRepository: DashboardRepository) {}

  async execute(): Promise<Account> {
    try {
      return await this.dashboardRepository.fetchAccount();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch account data");
    }
  }
}
