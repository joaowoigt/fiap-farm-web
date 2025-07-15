export interface RegisterUseCase {
  execute: (email: string, password: string) => Promise<boolean>;
}
