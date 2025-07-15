/**
 * Testes para DIContainer
 * Verificam se a injeção de dependências está funcionando corretamente
 */

import { DIContainer } from "../../src/domain/di/DIContainer";

describe("DIContainer", () => {
  let container: DIContainer;

  beforeEach(() => {
    container = DIContainer.getInstance();
  });

  describe("Singleton Pattern", () => {
    test("should return the same instance", () => {
      const instance1 = DIContainer.getInstance();
      const instance2 = DIContainer.getInstance();

      expect(instance1).toBe(instance2);
    });
  });

  describe("Use Cases", () => {
    test("should provide GetUserUseCase", () => {
      const useCase = container.getGetUserUseCase();

      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    test("should provide AddProductionUseCase", () => {
      const useCase = container.getAddProductionUseCase();

      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    test("should provide AddSalesItemUseCase", () => {
      const useCase = container.getAddSalesItemUseCase();

      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });

    test("should provide AddGoalUseCase", () => {
      const useCase = container.getAddGoalUseCase();

      expect(useCase).toBeDefined();
      expect(useCase.execute).toBeInstanceOf(Function);
    });
  });

  describe("Repositories", () => {
    test("should provide UserRepository", () => {
      const repository = container.getUserRepository();

      expect(repository).toBeDefined();
      expect(repository.getUserByUid).toBeInstanceOf(Function);
    });

    test("should provide ProductionRepository", () => {
      const repository = container.getProductionRepository();

      expect(repository).toBeDefined();
      expect(repository.addProductionToUser).toBeInstanceOf(Function);
    });

    test("should provide SalesRepository", () => {
      const repository = container.getSalesRepository();

      expect(repository).toBeDefined();
      expect(repository.addSalesToUser).toBeInstanceOf(Function);
    });

    test("should provide GoalsRepository", () => {
      const repository = container.getGoalsRepository();

      expect(repository).toBeDefined();
      expect(repository.addGoalToUser).toBeInstanceOf(Function);
    });
  });
});
