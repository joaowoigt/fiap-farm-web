import {
  Result,
  Success,
  Failure,
  ValidationError,
  DatabaseError,
} from "../../../src/domain/common/Result";

describe("Result Pattern", () => {
  describe("Success", () => {
    it("should create a successful result", () => {
      const value = "test value";
      const result = Success.create(value);

      expect(result.isSuccess()).toBe(true);
      expect(result.isFailure()).toBe(false);
      expect(result.getValue()).toBe(value);
    });

    it("should map value correctly", () => {
      const result = Success.create(5);
      const mapped = result.map((x) => x * 2);

      expect(mapped.isSuccess()).toBe(true);
      expect(mapped.getValue()).toBe(10);
    });

    it("should flat map correctly", () => {
      const result = Success.create(5);
      const flatMapped = result.flatMap((x) => Success.create(x * 2));

      expect(flatMapped.isSuccess()).toBe(true);
      expect(flatMapped.getValue()).toBe(10);
    });
  });

  describe("Failure", () => {
    it("should create a failed result", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create(error);

      expect(result.isSuccess()).toBe(false);
      expect(result.isFailure()).toBe(true);
      expect(result.getError()).toBe(error);
    });

    it("should propagate failure in map", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create<number>(error);
      const mapped = result.map((x) => x * 2);

      expect(mapped.isFailure()).toBe(true);
      expect(mapped.getError()).toBe(error);
    });

    it("should match correctly", () => {
      const error = new ValidationError("Test error");
      const result = Failure.create<string>(error);

      const matched = result.match(
        (value) => `Success: ${value}`,
        (err) => `Error: ${err.message}`,
      );

      expect(matched).toBe("Error: Test error");
    });
  });

  describe("Domain Errors", () => {
    it("should create ValidationError correctly", () => {
      const error = new ValidationError("Validation failed");
      expect(error.name).toBe("ValidationError");
      expect(error.message).toBe("Validation failed");
    });

    it("should create DatabaseError correctly", () => {
      const error = new DatabaseError("Database connection failed");
      expect(error.name).toBe("DatabaseError");
      expect(error.message).toBe("Database connection failed");
    });
  });
});
