import { Statement } from "../../models/Statement";

export interface StatementUseCase {
  execute(accountId: string): Promise<Statement>;
}
