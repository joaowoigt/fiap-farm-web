import { Account } from "../../models/Account";

export interface AccountUseCase {
  execute(): Promise<Account>;
}
