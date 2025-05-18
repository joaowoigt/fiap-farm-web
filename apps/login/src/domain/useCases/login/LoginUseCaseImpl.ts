import { LoginRepository } from "../../../data/repositories/LoginRepository";
import { LoginUseCase } from "./LoginUseCase";

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(private loginRepository: LoginRepository) {}

  async execute(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Preencha os campos para prosseguir");
    }
    try {
      const token = await this.loginRepository.login(email, password);
      return token;
    } catch (error) {
      console.error(error);
      throw new Error("Email ou senha inválidos");
    }
  }
}
