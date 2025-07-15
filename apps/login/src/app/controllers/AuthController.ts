import { DIContainer } from "../../domain/di/DIContainer";
import { LoginUseCase } from "../../domain/useCases/login/LoginUseCase";
import { RegisterUseCase } from "../../domain/useCases/register/RegisterUseCase";
import { AuthRepository } from "../../domain/repositories/auth-repository";
import { User } from "../../domain/models/user";
import { Result } from "../../domain/common/Result";

// Controller seguindo o padrão SRP - responsável apenas pela lógica de negócio de autenticação
export class AuthController {
  private loginUseCase: LoginUseCase;
  private registerUseCase: RegisterUseCase;

  constructor() {
    const container = DIContainer.getInstance();

    // Injeção de dependências através do container
    this.loginUseCase = new LoginUseCaseImpl(container.getAuthRepository());
    this.registerUseCase = new RegisterUseCaseImpl(
      container.getAuthRepository()
    );
  }

  async login(email: string, password: string): Promise<Result<User>> {
    try {
      return await this.loginUseCase.execute(email, password);
    } catch (error) {
      console.error("Error in AuthController.login:", error);
      throw error;
    }
  }

  async register(email: string, password: string): Promise<Result<User>> {
    try {
      return await this.registerUseCase.execute(email, password);
    } catch (error) {
      console.error("Error in AuthController.register:", error);
      throw error;
    }
  }
}

// Implementações dos Use Cases atualizadas para usar o DI Container
class LoginUseCaseImpl implements LoginUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<Result<User>> {
    return await this.authRepository.loginWithEmailAndPassword(email, password);
  }
}

class RegisterUseCaseImpl implements RegisterUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<Result<User>> {
    return await this.authRepository.registerUserWithEmailAndPassword(
      email,
      password
    );
  }
}
