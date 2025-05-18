export interface RegisterUseCase {
  execute: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
}
