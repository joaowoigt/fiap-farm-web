/**
 * Testes para AuthenticationService
 * Verifica validações de autenticação e regras de negócio
 */

import { AuthenticationService } from "../../../src/domain/services/AuthenticationService";

describe("AuthenticationService", () => {
  let service: AuthenticationService;

  beforeEach(() => {
    service = new AuthenticationService();
  });

  describe("Validação de email", () => {
    test("deve aceitar email válido", () => {
      const result = service.validateEmailFormat("usuario@example.com");

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com email vazio", () => {
      const result = service.validateEmailFormat("");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Email é obrigatório");
    });

    test("deve falhar com email null", () => {
      const result = service.validateEmailFormat(null as any);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Email é obrigatório");
    });

    test("deve falhar com formato inválido", () => {
      const result = service.validateEmailFormat("email_invalido");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Formato de email inválido");
    });

    test("deve falhar com email muito longo", () => {
      const longEmail = "a".repeat(250) + "@example.com";
      const result = service.validateEmailFormat(longEmail);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Email muito longo");
    });

    test("deve falhar com domínio suspeito", () => {
      const result = service.validateEmailFormat("usuario@temp-mail.org");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Domínio de email não permitido");
    });

    test("deve aceitar emails com subdomínios", () => {
      const result = service.validateEmailFormat(
        "usuario@subdomain.example.com"
      );

      expect(result.isSuccess).toBe(true);
    });

    test("deve aceitar emails com caracteres especiais válidos", () => {
      const result = service.validateEmailFormat("user.name+tag@example.co.uk");

      expect(result.isSuccess).toBe(true);
    });
  });

  describe("Validação de senha forte", () => {
    test("deve aceitar senha forte", () => {
      const result = service.validatePasswordStrength("MinhaSenh@123");

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com senha muito curta", () => {
      const result = service.validatePasswordStrength("Abc1@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("pelo menos 8 caracteres");
    });

    test("deve falhar com senha muito longa", () => {
      const longPassword = "A".repeat(130) + "1@";
      const result = service.validatePasswordStrength(longPassword);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("muito longa");
    });

    test("deve falhar sem letra minúscula", () => {
      const result = service.validatePasswordStrength("MINHASENHA123@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("letra minúscula");
    });

    test("deve falhar sem letra maiúscula", () => {
      const result = service.validatePasswordStrength("minhasenha123@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("letra maiúscula");
    });

    test("deve falhar sem número", () => {
      const result = service.validatePasswordStrength("MinhaSenha@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("pelo menos um número");
    });

    test("deve falhar sem caractere especial", () => {
      const result = service.validatePasswordStrength("MinhaSenha123");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("caractere especial");
    });

    test("deve falhar com padrões fracos - repetição", () => {
      const result = service.validatePasswordStrength("MinhaAAAA123@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("muito fraca");
    });

    test("deve falhar com padrões comuns", () => {
      const result = service.validatePasswordStrength("Password123@");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("muito fraca");
    });

    test("deve falhar com apenas letras", () => {
      const result = service.validatePasswordStrength("ApenasLetras");

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("muito fraca");
    });
  });

  describe("Validação de credenciais de login", () => {
    test("deve aceitar credenciais válidas", () => {
      const result = service.validateLoginCredentials(
        "usuario@example.com",
        "MinhaSenh@123"
      );

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com email inválido", () => {
      const result = service.validateLoginCredentials(
        "email_invalido",
        "senha123"
      );

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Formato de email inválido");
    });

    test("deve falhar com senha vazia", () => {
      const result = service.validateLoginCredentials(
        "usuario@example.com",
        ""
      );

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Senha não pode estar vazia");
    });
  });

  describe("Validação de dados de registro", () => {
    test("deve aceitar dados válidos de registro", () => {
      const result = service.validateRegistrationData(
        "usuario@example.com",
        "MinhaSenh@123",
        "João Silva"
      );

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com nome de usuário inválido", () => {
      const result = service.validateRegistrationData(
        "usuario@example.com",
        "MinhaSenh@123",
        "João"
      );

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("nome e sobrenome completos");
    });

    test("deve falhar com nome contendo números", () => {
      const result = service.validateRegistrationData(
        "usuario@example.com",
        "MinhaSenh@123",
        "João123 Silva"
      );

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("apenas letras e espaços");
    });

    test("deve aceitar nome com acentos", () => {
      const result = service.validateRegistrationData(
        "usuario@example.com",
        "MinhaSenh@123",
        "José da Conceição"
      );

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com nome muito longo", () => {
      const longName = "João " + "Silva ".repeat(10);
      const result = service.validateRegistrationData(
        "usuario@example.com",
        "MinhaSenh@123",
        longName
      );

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("muito longo");
    });
  });

  describe("Utilitários", () => {
    test("deve calcular score de senha corretamente", () => {
      const weakScore = service.calculatePasswordScore("123");
      const strongScore = service.calculatePasswordScore("MinhaSenh@123");

      expect(weakScore).toBeLessThan(50);
      expect(strongScore).toBeGreaterThan(80);
    });

    test("deve sanitizar email corretamente", () => {
      const sanitized = service.sanitizeEmail("  USUARIO@EXAMPLE.COM  ");

      expect(sanitized).toBe("usuario@example.com");
    });

    test("deve identificar email bloqueado", () => {
      const isBlocked = service.isEmailBlocked("user@example.com");

      expect(isBlocked).toBe(true);
    });

    test("deve permitir email não bloqueado", () => {
      const isBlocked = service.isEmailBlocked("user@gmail.com");

      expect(isBlocked).toBe(false);
    });

    test("deve sanitizar email vazio", () => {
      const sanitized = service.sanitizeEmail("");

      expect(sanitized).toBe("");
    });

    test("deve lidar com input null na sanitização", () => {
      const sanitized = service.sanitizeEmail(null as any);

      expect(sanitized).toBe("");
    });
  });

  describe("Casos extremos", () => {
    test("deve lidar com email com espaços no meio", () => {
      const result = service.validateEmailFormat("user name@example.com");

      expect(result.isFailure).toBe(true);
    });

    test("deve aceitar email com múltiplos pontos", () => {
      const result = service.validateEmailFormat("user.name.test@example.com");

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com senha apenas com espaços", () => {
      const result = service.validatePasswordStrength("        ");

      expect(result.isFailure).toBe(true);
    });

    test("deve calcular score zero para senha vazia", () => {
      const score = service.calculatePasswordScore("");

      expect(score).toBe(0);
    });
  });
});
