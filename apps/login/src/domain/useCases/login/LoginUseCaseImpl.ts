import { AuthRepository } from "../../repositories/auth-repository";
import { LoginUseCase } from "./LoginUseCase";
import { firebaseAuthRepository } from "../../../data/firebase/Auth/firebase-auth-repository";
import {
  Result,
  Success,
  Failure,
  ValidationError,
  AuthenticationError,
} from "../../common/Result";
import { AuthenticationService } from "../../services/AuthenticationService";
import { User } from "../../models/user";

export class LoginUseCaseImpl implements LoginUseCase {
  private authenticationService: AuthenticationService;

  constructor(
    private authRepository: AuthRepository,
    authenticationService?: AuthenticationService
  ) {
    this.authenticationService =
      authenticationService || new AuthenticationService();
  }

  async execute(email: string, password: string): Promise<Result<User>> {
    // Sanitizar email
    const sanitizedEmail = this.authenticationService.sanitizeEmail(email);

    // Validar credenciais usando o Domain Service
    const credentialsValidation =
      this.authenticationService.validateLoginCredentials(
        sanitizedEmail,
        password
      );
    if (credentialsValidation.isFailure) {
      return Failure.create(credentialsValidation.error);
    }

    // Verificar se o email está bloqueado
    if (this.authenticationService.isEmailBlocked(sanitizedEmail)) {
      return Failure.create(
        new ValidationError("Email não permitido para acesso")
      );
    }

    try {
      // Tentar fazer o login através do repositório
      const loginResult = await this.authRepository.loginWithEmailAndPassword(
        sanitizedEmail,
        password
      );

      if (loginResult.isFailure) {
        // Se o repositório retornar falha, converter para erro de autenticação
        return Failure.create(
          new AuthenticationError("Email ou senha inválidos")
        );
      }

      // Login bem-sucedido
      console.log("Login bem-sucedido para usuário:", loginResult.value.id);
      return Success.create(loginResult.value);
    } catch (error: any) {
      console.error("Erro inesperado durante login:", error);

      // Mapear diferentes tipos de erro
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        return Failure.create(
          new AuthenticationError("Email ou senha inválidos")
        );
      }

      if (error.code === "auth/user-disabled") {
        return Failure.create(
          new AuthenticationError(
            "Conta desabilitada. Entre em contato com o suporte"
          )
        );
      }

      if (error.code === "auth/too-many-requests") {
        return Failure.create(
          new AuthenticationError(
            "Muitas tentativas de login. Tente novamente mais tarde"
          )
        );
      }

      // Erro genérico
      return Failure.create(
        new AuthenticationError("Erro interno. Tente novamente")
      );
    }
  }

  /**
   * Método auxiliar para validação adicional de entrada
   */
  private validateInput(email: string, password: string): Result<void> {
    if (!email && !password) {
      return Failure.create(
        new ValidationError("Email e senha são obrigatórios")
      );
    }

    if (!email) {
      return Failure.create(new ValidationError("Email é obrigatório"));
    }

    if (!password) {
      return Failure.create(new ValidationError("Senha é obrigatória"));
    }

    return Success.create(undefined);
  }
}

export const loginUseCaseImpl = new LoginUseCaseImpl(firebaseAuthRepository);
