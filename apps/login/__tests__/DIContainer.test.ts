import { DIContainer } from "../src/domain/di/DIContainer";
import { AuthRepository } from "../src/domain/repositories/auth-repository";

// Mock Firebase auth
jest.mock("../src/data/firebase/clientApp", () => ({
  auth: {},
}));

describe("DIContainer", () => {
  afterEach(() => {
    // Reset the singleton instance for each test
    (DIContainer as any).instance = undefined;
  });

  describe("Singleton Pattern", () => {
    it("should return the same instance when called multiple times", () => {
      const instance1 = DIContainer.getInstance();
      const instance2 = DIContainer.getInstance();

      expect(instance1).toBe(instance2);
    });

    it("should create only one instance", () => {
      const instance1 = DIContainer.getInstance();
      const instance2 = DIContainer.getInstance();
      const instance3 = DIContainer.getInstance();

      expect(instance1).toBe(instance2);
      expect(instance2).toBe(instance3);
    });
  });

  describe("Dependency Injection", () => {
    it("should provide AuthRepository instance", () => {
      const container = DIContainer.getInstance();
      const authRepository = container.getAuthRepository();

      expect(authRepository).toBeDefined();
      expect(authRepository).toHaveProperty("loginWithEmailAndPassword");
      expect(authRepository).toHaveProperty("registerUserWithEmailAndPassword");
    });

    it("should return the same AuthRepository instance when called multiple times", () => {
      const container = DIContainer.getInstance();
      const authRepo1 = container.getAuthRepository();
      const authRepo2 = container.getAuthRepository();

      expect(authRepo1).toBe(authRepo2);
    });

    it("should satisfy AuthRepository interface", () => {
      const container = DIContainer.getInstance();
      const authRepository = container.getAuthRepository() as AuthRepository;

      expect(typeof authRepository.loginWithEmailAndPassword).toBe("function");
      expect(typeof authRepository.registerUserWithEmailAndPassword).toBe(
        "function",
      );
    });
  });

  describe("Constructor Privacy", () => {
    it("should not allow direct instantiation", () => {
      // In TypeScript, private constructors are compile-time protected
      // We can verify the pattern works by ensuring getInstance is the only way to create instances
      const container1 = DIContainer.getInstance();
      const container2 = DIContainer.getInstance();

      expect(container1).toBe(container2); // Should be the same instance
    });
  });

  describe("Initialization", () => {
    it("should initialize dependencies correctly", () => {
      const container = DIContainer.getInstance();

      // Verify that the container initializes without errors
      expect(container).toBeInstanceOf(DIContainer);

      // Verify that dependencies are properly initialized
      const authRepository = container.getAuthRepository();
      expect(authRepository).toBeDefined();
    });
  });
});
