export interface NewTransactionUseCase {
  execute: (value: number, type: string, accountId: string) => Promise<boolean>;
}
