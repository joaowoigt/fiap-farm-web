/**
 * Testes para Value Objects
 * Verificam se as validações de domínio estão funcionando corretamente
 */

import {
  Email,
  UserId,
  ProductName,
  PositiveNumber,
  MonetaryValue,
} from "../../src/domain/valueObjects/ValueObjects";
import { ValidationError } from "../../src/domain/common/Result";

describe("Value Objects", () => {
  describe("Email", () => {
    test("should create valid email", () => {
      const email = new Email("test@example.com");
      expect(email.getValue()).toBe("test@example.com");
    });

    test("should normalize email to lowercase", () => {
      const email = new Email("TEST@EXAMPLE.COM");
      expect(email.getValue()).toBe("test@example.com");
    });
    test("should throw error for empty email", () => {
      expect(() => new Email("")).toThrow("Email é obrigatório");
    });

    test("should throw error for invalid email format", () => {
      expect(() => new Email("invalid-email")).toThrow("Email inválido");
    });

    test("should compare emails correctly", () => {
      const email1 = new Email("test@example.com");
      const email2 = new Email("TEST@EXAMPLE.COM");
      expect(email1.equals(email2)).toBe(true);
    });
  });

  describe("UserId", () => {
    test("should create valid user id", () => {
      const userId = new UserId("user123");
      expect(userId.getValue()).toBe("user123");
    });
    test("should throw error for empty user id", () => {
      expect(() => new UserId("")).toThrow("ID do usuário é obrigatório");
    });

    test("should throw error for short user id", () => {
      expect(() => new UserId("ab")).toThrow(
        "ID do usuário deve ter pelo menos 3 caracteres"
      );
    });

    test("should trim whitespace", () => {
      const userId = new UserId("  user123  ");
      expect(userId.getValue()).toBe("user123");
    });
  });

  describe("ProductName", () => {
    test("should create valid product name", () => {
      const name = new ProductName("Produto Teste");
      expect(name.getValue()).toBe("Produto Teste");
    });
    test("should throw error for empty name", () => {
      expect(() => new ProductName("")).toThrow(
        "Nome do produto é obrigatório"
      );
    });

    test("should throw error for short name", () => {
      expect(() => new ProductName("A")).toThrow(
        "Nome do produto deve ter pelo menos 2 caracteres"
      );
    });

    test("should throw error for long name", () => {
      const longName = "A".repeat(101);
      expect(() => new ProductName(longName)).toThrow(
        "Nome do produto não pode exceder 100 caracteres"
      );
    });
  });

  describe("PositiveNumber", () => {
    test("should create valid positive number", () => {
      const number = new PositiveNumber(10, "quantidade");
      expect(number.getValue()).toBe(10);
    });
    test("should throw error for zero", () => {
      expect(() => new PositiveNumber(0, "quantidade")).toThrow(
        "quantidade deve ser um número positivo"
      );
    });

    test("should throw error for negative number", () => {
      expect(() => new PositiveNumber(-5, "quantidade")).toThrow(
        "quantidade deve ser um número positivo"
      );
    });

    test("should throw error for NaN", () => {
      expect(() => new PositiveNumber(NaN, "quantidade")).toThrow(
        "quantidade deve ser um número válido"
      );
    });
  });

  describe("MonetaryValue", () => {
    test("should create valid monetary value", () => {
      const value = new MonetaryValue(10.99);
      expect(value.getValue()).toBe(10.99);
    });

    test("should round to 2 decimal places", () => {
      const value = new MonetaryValue(10.999);
      expect(value.getValue()).toBe(11);
    });

    test("should accept zero", () => {
      const value = new MonetaryValue(0);
      expect(value.getValue()).toBe(0);
    });
    test("should throw error for negative value", () => {
      expect(() => new MonetaryValue(-1)).toThrow(
        "Valor monetário não pode ser negativo"
      );
    });

    test("should format as currency", () => {
      const value = new MonetaryValue(10.5);
      const formatted = value.toCurrency();
      expect(formatted).toMatch(/R\$.*10[.,]50/);
    });
  });
});
