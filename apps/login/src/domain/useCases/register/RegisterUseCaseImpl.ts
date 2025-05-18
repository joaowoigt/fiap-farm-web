import { AuthRepository } from "../../repositories/auth-repository";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterUseCaseImpl implements RegisterUseCase {
  constructor(private authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(email: string, password: string): Promise<boolean> {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }
    try {
      const user = await this.authRepository.registerUserWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error: any) {
      console.error("Erro ao registrar usuário", error);
      throw new Error(`Erro ao registrar usuário: ${error.message}`);
    }
  }
}
