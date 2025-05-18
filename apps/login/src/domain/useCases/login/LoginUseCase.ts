export interface LoginUseCase {
  execute: (email: string, password: string) => Promise<string>;
}
