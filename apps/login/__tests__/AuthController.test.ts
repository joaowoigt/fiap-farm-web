import { AuthController } from "../src/app/controllers/AuthController";
import { DIContainer } from "../src/domain/di/DIContainer";
import { AuthRepository } from "../src/domain/repositories/auth-repository";
import {
  Success,
  Failure,
  ValidationError,
  AuthenticationError,
} from "../src/domain/common/Result";
import { User } from "../src/domain/models/user";

// Mock the DIContainer
jest.mock("../src/domain/di/DIContainer");

describe("AuthController", () => {
  let authController: AuthController;
  let mockAuthRepository: jest.Mocked<AuthRepository>;
  let mockDIContainer: jest.Mocked<DIContainer>;

  beforeEach(() => {
    // Create mock repository
    mockAuthRepository = {
      loginWithEmailAndPassword: jest.fn(),
      registerUserWithEmailAndPassword: jest.fn(),
    };

    // Create mock DI container
    mockDIContainer = {
      getAuthRepository: jest.fn().mockReturnValue(mockAuthRepository),
    } as any;

    // Mock DIContainer.getInstance to return our mock
    (DIContainer.getInstance as jest.Mock).mockReturnValue(mockDIContainer);

    authController = new AuthController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const email = "test@example.com";
      const password = "password123";
      const user: User = { id: "123", email };
      const successResult = Success.create(user);

      mockAuthRepository.loginWithEmailAndPassword.mockResolvedValue(
        successResult,
      );

      const result = await authController.login(email, password);

      expect(mockAuthRepository.loginWithEmailAndPassword).toHaveBeenCalledWith(
        email,
        password,
      );
      expect(result.isSuccess()).toBe(true);
      expect(result.getValue()).toEqual(user);
    });

    it("should return failure for invalid credentials", async () => {
      const email = "test@example.com";
      const password = "wrongpassword";
      const error = new AuthenticationError("Email ou senha inválidos");
      const failureResult = Failure.create<User>(error);

      mockAuthRepository.loginWithEmailAndPassword.mockResolvedValue(
        failureResult,
      );

      const result = await authController.login(email, password);

      expect(mockAuthRepository.loginWithEmailAndPassword).toHaveBeenCalledWith(
        email,
        password,
      );
      expect(result.isFailure()).toBe(true);
      expect(result.getError()).toEqual(error);
    });

    it("should handle repository errors gracefully", async () => {
      const email = "test@example.com";
      const password = "password123";

      mockAuthRepository.loginWithEmailAndPassword.mockRejectedValue(
        new Error("Database error"),
      );

      await expect(authController.login(email, password)).rejects.toThrow(
        "Database error",
      );
      expect(mockAuthRepository.loginWithEmailAndPassword).toHaveBeenCalledWith(
        email,
        password,
      );
    });
  });

  describe("register", () => {
    it("should register successfully with valid data", async () => {
      const email = "newuser@example.com";
      const password = "password123";
      const user: User = { id: "456", email };
      const successResult = Success.create(user);

      mockAuthRepository.registerUserWithEmailAndPassword.mockResolvedValue(
        successResult,
      );

      const result = await authController.register(email, password);

      expect(
        mockAuthRepository.registerUserWithEmailAndPassword,
      ).toHaveBeenCalledWith(email, password);
      expect(result.isSuccess()).toBe(true);
      expect(result.getValue()).toEqual(user);
    });

    it("should return failure for duplicate email", async () => {
      const email = "existing@example.com";
      const password = "password123";
      const error = new ValidationError("Email já está em uso");
      const failureResult = Failure.create<User>(error);

      mockAuthRepository.registerUserWithEmailAndPassword.mockResolvedValue(
        failureResult,
      );

      const result = await authController.register(email, password);

      expect(
        mockAuthRepository.registerUserWithEmailAndPassword,
      ).toHaveBeenCalledWith(email, password);
      expect(result.isFailure()).toBe(true);
      expect(result.getError()).toEqual(error);
    });

    it("should handle repository errors gracefully", async () => {
      const email = "newuser@example.com";
      const password = "password123";

      mockAuthRepository.registerUserWithEmailAndPassword.mockRejectedValue(
        new Error("Network error"),
      );

      await expect(authController.register(email, password)).rejects.toThrow(
        "Network error",
      );
      expect(
        mockAuthRepository.registerUserWithEmailAndPassword,
      ).toHaveBeenCalledWith(email, password);
    });
  });

  describe("Dependency Injection", () => {
    it("should use DIContainer to get AuthRepository", () => {
      new AuthController();

      expect(DIContainer.getInstance).toHaveBeenCalled();
      expect(mockDIContainer.getAuthRepository).toHaveBeenCalled();
    });
  });
});
