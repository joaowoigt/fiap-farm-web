/**
 * Testes para Result Pattern
 * Verificam se o tratamento de erros está funcionando corretamente
 */

import {
  Result,
  Success,
  Failure,
  ValidationError,
  DatabaseError,
} from "../../src/domain/common/Result";

describe("Result Pattern", () => {
  describe("Success Result", () => {
    test("should create successful result", () => {
      const result = Success.create("test value");

      expect(result.isSuccess).toBe(true);
      expect(result.isFailure).toBe(false);
      expect(result.value).toBe("test value");
    });

    test("should map successful result", () => {
      const result = Success.create(10);
      const mapped = result.map((x) => x * 2);

      expect(mapped.isSuccess).toBe(true);
      expect(mapped.value).toBe(20);
    });

    test("should flatMap successful result", () => {
      const result = Success.create(10);
      const flatMapped = result.flatMap((x) => Success.create(x * 2));

      expect(flatMapped.isSuccess).toBe(true);
      expect(flatMapped.value).toBe(20);
    });
  });

  describe("Failure Result", () => {
    test("should create failed result", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create(error);

      expect(result.isSuccess).toBe(false);
      expect(result.isFailure).toBe(true);
      expect(result.error).toBe(error);
    });

    test("should not map failed result", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create<number>(error);
      const mapped = result.map((x) => x * 2);

      expect(mapped.isFailure).toBe(true);
      expect(mapped.error).toBe(error);
    });

    test("should throw when accessing value from failed result", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create(error);

      expect(() => result.value).toThrow();
    });
  });

  describe("Result matching", () => {
    test("should match successful result", () => {
      const result = Success.create("success");

      const matched = result.match(
        (value) => `Success: ${value}`,
        (error) => `Error: ${error.message}`
      );

      expect(matched).toBe("Success: success");
    });

    test("should match failed result", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create(error);

      const matched = result.match(
        (value) => `Success: ${value}`,
        (error) => `Error: ${error.message}`
      );

      expect(matched).toBe("Error: Test error");
    });
  });

  describe("Domain Errors", () => {
    test("should create ValidationError with correct properties", () => {
      const error = new ValidationError("Invalid data");

      expect(error.name).toBe("ValidationError");
      expect(error.code).toBe("VALIDATION_ERROR");
      expect(error.message).toBe("Invalid data");
    });

    test("should create DatabaseError with correct properties", () => {
      const error = new DatabaseError("Connection failed");

      expect(error.name).toBe("DatabaseError");
      expect(error.code).toBe("DATABASE_ERROR");
      expect(error.message).toBe("Connection failed");
    });
  });
});
