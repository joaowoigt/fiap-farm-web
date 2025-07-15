import { Account } from "../../domain/models/Account";
import { Statement } from "../../domain/models/Statement";

export interface DashboardRepository {
  fetchAccount(): Promise<Account>;
  fetchStatement(accountId: string): Promise<Statement>;
  addTransaction(
    value: number,
    type: string,
    accountId: string,
  ): Promise<boolean>;
}
