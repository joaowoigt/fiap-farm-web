import {
  Result,
  Success,
  Failure,
  ValidationError,
  AuthenticationError,
  NetworkError,
} from "../src/domain/common/Result";

describe("Result Pattern", () => {
  describe("Success", () => {
    it("should create a successful result", () => {
      const user = { id: "123", email: "test@example.com" };
      const result = Success.create(user);

      expect(result.isSuccess()).toBe(true);
      expect(result.isFailure()).toBe(false);
      expect(result.getValue()).toEqual(user);
    });

    it("should execute onSuccess callback in match", () => {
      const user = { id: "123", email: "test@example.com" };
      const result = Success.create(user);

      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      result.match(onSuccess, onFailure);

      expect(onSuccess).toHaveBeenCalledWith(user);
      expect(onFailure).not.toHaveBeenCalled();
    });

    it("should transform value with map", () => {
      const user = { id: "123", email: "test@example.com" };
      const result = Success.create(user);

      const mappedResult = result.map((u) => u.id);

      expect(mappedResult.isSuccess()).toBe(true);
      expect(mappedResult.getValue()).toBe("123");
    });
  });

  describe("Failure", () => {
    it("should create a failed result", () => {
      const error = new ValidationError("Email is required");
      const result = Failure.create(error);

      expect(result.isSuccess()).toBe(false);
      expect(result.isFailure()).toBe(true);
      expect(result.getError()).toEqual(error);
    });

    it("should execute onFailure callback in match", () => {
      const error = new ValidationError("Email is required");
      const result = Failure.create(error);

      const onSuccess = jest.fn();
      const onFailure = jest.fn();

      result.match(onSuccess, onFailure);

      expect(onSuccess).not.toHaveBeenCalled();
      expect(onFailure).toHaveBeenCalledWith(error);
    });
    it("should not transform value with map", () => {
      const error = new ValidationError("Email is required");
      const result = Failure.create(error);

      const mappedResult = result.map((_u: any) => "transformed");

      expect(mappedResult.isFailure()).toBe(true);
      expect(mappedResult.getError()).toEqual(error);
    });

    it("should throw error when trying to get value from failure", () => {
      const error = new ValidationError("Email is required");
      const result = Failure.create(error);

      expect(() => result.getValue()).toThrow(
        "Cannot get value from a failed result",
      );
    });
  });

  describe("Domain Errors", () => {
    it("should create ValidationError", () => {
      const error = new ValidationError("Email is invalid");
      expect(error.name).toBe("ValidationError");
      expect(error.message).toBe("Email is invalid");
    });

    it("should create AuthenticationError", () => {
      const error = new AuthenticationError("Invalid credentials");
      expect(error.name).toBe("AuthenticationError");
      expect(error.message).toBe("Invalid credentials");
    });

    it("should create NetworkError", () => {
      const error = new NetworkError("Connection failed");
      expect(error.name).toBe("NetworkError");
      expect(error.message).toBe("Connection failed");
    });
  });
});
