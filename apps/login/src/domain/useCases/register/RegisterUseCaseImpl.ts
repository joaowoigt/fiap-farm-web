import { LoginRepository } from "../../../data/repositories/LoginRepository";

export class RegisterUseCaseImpl {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    try {
      return this.loginRepository.register(username, email, password);
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao registrar usuário");
    }
  }
}
