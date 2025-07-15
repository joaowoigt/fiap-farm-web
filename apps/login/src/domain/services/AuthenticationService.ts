/**
 * AuthenticationService
 *
 * Implementa regras de negócio para autenticação
 * seguindo princípios de Domain Service
 */

// Update the import path below to the correct location of Result, Success, Failure, ValidationError
import { Result, Success, Failure, ValidationError } from "../common/Result";

export interface AuthenticationRules {
  /**
   * Valida credenciais de login
   */
  validateLoginCredentials(email: string, password: string): Result<void>;

  /**
   * Valida dados de registro
   */
  validateRegistrationData(
    email: string,
    password: string,
    username?: string
  ): Result<void>;

  /**
   * Verifica força da senha
   */
  validatePasswordStrength(password: string): Result<void>;

  /**
   * Valida formato do email
   */
  validateEmailFormat(email: string): Result<void>;
}

export class AuthenticationService implements AuthenticationRules {
  /**
   * Valida credenciais de login
   */
  public validateLoginCredentials(
    email: string,
    password: string
  ): Result<void> {
    // Validação do email
    const emailValidation = this.validateEmailFormat(email);
    if (emailValidation.isFailure) {
      return emailValidation;
    }

    // Validação básica da senha (sem verificar força completa no login)
    const passwordValidation = this.validatePasswordBasic(password);
    if (passwordValidation.isFailure) {
      return passwordValidation;
    }

    return Success.create(undefined);
  }

  /**
   * Valida dados de registro
   */
  public validateRegistrationData(
    email: string,
    password: string,
    username?: string
  ): Result<void> {
    // Validação do email
    const emailValidation = this.validateEmailFormat(email);
    if (emailValidation.isFailure) {
      return emailValidation;
    }

    // Validação completa da senha
    const passwordValidation = this.validatePasswordStrength(password);
    if (passwordValidation.isFailure) {
      return passwordValidation;
    }

    // Validação do nome de usuário se fornecido
    if (username !== undefined) {
      const usernameValidation = this.validateUsername(username);
      if (usernameValidation.isFailure) {
        return usernameValidation;
      }
    }

    return Success.create(undefined);
  }

  /**
   * Valida formato do email
   */
  public validateEmailFormat(email: string): Result<void> {
    if (!email || typeof email !== "string") {
      return Failure.create(new ValidationError("Email é obrigatório"));
    }

    const trimmedEmail = email.trim();

    if (trimmedEmail.length === 0) {
      return Failure.create(new ValidationError("Email não pode estar vazio"));
    }

    if (trimmedEmail.length > 254) {
      return Failure.create(new ValidationError("Email muito longo"));
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(trimmedEmail)) {
      return Failure.create(new ValidationError("Formato de email inválido"));
    }

    // Verificar domínios suspeitos
    const suspiciousDomains = [
      "temp-mail.org",
      "10minutemail.com",
      "guerrillamail.com",
    ];
    const domain = trimmedEmail.split("@")[1]?.toLowerCase();

    if (suspiciousDomains.includes(domain)) {
      return Failure.create(
        new ValidationError("Domínio de email não permitido")
      );
    }

    return Success.create(undefined);
  }

  /**
   * Valida força da senha
   */
  public validatePasswordStrength(password: string): Result<void> {
    if (!password || typeof password !== "string") {
      return Failure.create(new ValidationError("Senha é obrigatória"));
    }

    if (password.length < 8) {
      return Failure.create(
        new ValidationError("Senha deve ter pelo menos 8 caracteres")
      );
    }

    if (password.length > 128) {
      return Failure.create(
        new ValidationError("Senha muito longa (máximo 128 caracteres)")
      );
    }

    // Verificar presença de caracteres obrigatórios
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
      password
    );

    if (!hasLowerCase) {
      return Failure.create(
        new ValidationError("Senha deve conter pelo menos uma letra minúscula")
      );
    }

    if (!hasUpperCase) {
      return Failure.create(
        new ValidationError("Senha deve conter pelo menos uma letra maiúscula")
      );
    }

    if (!hasNumbers) {
      return Failure.create(
        new ValidationError("Senha deve conter pelo menos um número")
      );
    }

    if (!hasSpecialChars) {
      return Failure.create(
        new ValidationError(
          "Senha deve conter pelo menos um caractere especial"
        )
      );
    }

    // Verificar padrões comuns fracos
    const weakPatterns = [
      /(.)\1{3,}/, // Caracteres repetidos
      /123456|password|qwerty|admin/i, // Padrões comuns
      /^[a-z]+$/i, // Apenas letras
      /^\d+$/, // Apenas números
    ];

    for (const pattern of weakPatterns) {
      if (pattern.test(password)) {
        return Failure.create(
          new ValidationError(
            "Senha muito fraca. Evite padrões comuns e caracteres repetidos"
          )
        );
      }
    }

    return Success.create(undefined);
  }

  /**
   * Validação básica da senha (para login)
   */
  private validatePasswordBasic(password: string): Result<void> {
    if (!password || typeof password !== "string") {
      return Failure.create(new ValidationError("Senha é obrigatória"));
    }

    if (password.trim().length === 0) {
      return Failure.create(new ValidationError("Senha não pode estar vazia"));
    }

    if (password.length > 128) {
      return Failure.create(new ValidationError("Senha inválida"));
    }

    return Success.create(undefined);
  }

  /**
   * Valida nome de usuário
   */
  private validateUsername(username: string): Result<void> {
    if (!username || typeof username !== "string") {
      return Failure.create(
        new ValidationError("Nome de usuário é obrigatório")
      );
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length < 2) {
      return Failure.create(
        new ValidationError("Nome de usuário deve ter pelo menos 2 caracteres")
      );
    }

    if (trimmedUsername.length > 50) {
      return Failure.create(
        new ValidationError(
          "Nome de usuário muito longo (máximo 50 caracteres)"
        )
      );
    }

    // Verificar se contém pelo menos nome e sobrenome
    const nameParts = trimmedUsername
      .split(" ")
      .filter((part) => part.length > 0);
    if (nameParts.length < 2) {
      return Failure.create(
        new ValidationError("Digite nome e sobrenome completos")
      );
    }

    // Verificar caracteres válidos
    const validNameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!validNameRegex.test(trimmedUsername)) {
      return Failure.create(
        new ValidationError(
          "Nome de usuário deve conter apenas letras e espaços"
        )
      );
    }

    return Success.create(undefined);
  }

  /**
   * Calcula score de segurança da senha
   */
  public calculatePasswordScore(password: string): number {
    if (!password) return 0;

    let score = 0;

    // Comprimento
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 25;

    // Tipos de caracteres
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/\d/.test(password)) score += 10;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 10;

    // Diversidade
    const uniqueChars = new Set(password).size;
    if (uniqueChars >= password.length * 0.7) score += 10;

    return Math.min(100, score);
  }

  /**
   * Sanitiza entrada de email
   */
  public sanitizeEmail(email: string): string {
    if (!email || typeof email !== "string") return "";
    return email.trim().toLowerCase();
  }

  /**
   * Verifica se o email está em uma lista de bloqueio
   */
  public isEmailBlocked(email: string): boolean {
    const blockedDomains = ["example.com", "test.com", "fake.com"];

    const domain = email.split("@")[1]?.toLowerCase();
    return blockedDomains.includes(domain);
  }
}
