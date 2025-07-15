import { AuthRepository } from "../../repositories/auth-repository";
import { LoginResult, LoginUseCase } from "./LoginUseCase";
import { firebaseAuthRepository } from "../../../data/firebase/Auth/firebase-auth-repository";

export class LoginUseCaseImpl implements LoginUseCase {
  constructor(private authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(email: string, password: string): Promise<LoginResult> {
    if (!email || !password) {
      return {
        show: true,
        message: "Email e senha são obrigatórios",
      };
    }
    try {
      const user = await this.authRepository.loginWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        console.log("Login bem-sucedido", user);
        return { user: user };
      } else {
        return {
          show: true,
          message: "Email ou senha inválidos",
        };
      }
    } catch (error) {
      console.error("Erro ao fazer login na camada de domain", error);
      return {
        show: true,
        message: "Erro ao fazer login",
      };
    }
  }
}

export const loginUseCaseImpl = new LoginUseCaseImpl(firebaseAuthRepository);
