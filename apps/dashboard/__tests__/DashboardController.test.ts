// Mock da função decrypt DEVE estar antes das outras importações
const mockDecrypt = jest.fn();
jest.mock("../src/data/security/EncryptUtils", () => ({
  decrypt: mockDecrypt,
}));

import { DashboardController } from "../src/app/controllers/DashboardController";
import { DIContainer } from "../src/domain/di/DIContainer";
import { UserRepository } from "../src/domain/repositories/user-repository";
import { ProductionRepository } from "../src/domain/repositories/production-repository";
import { SalesRepository } from "../src/domain/repositories/sales-repository";
import { GoalsRepository } from "../src/domain/repositories/goals-repository";
import {
  Result,
  Success,
  Failure,
  ValidationError,
} from "../src/domain/common/Result";
import User from "../src/domain/models/farm/user/User";
import Production from "../src/domain/models/farm/production/Production";

// Mock do DIContainer
jest.mock("../src/domain/di/DIContainer");

// Mock dos repositórios
const mockUserRepository: jest.Mocked<UserRepository> = {
  getUserByUid: jest.fn(),
};

const mockProductionRepository: jest.Mocked<ProductionRepository> = {
  addProductionToUser: jest.fn(),
};

const mockSalesRepository: jest.Mocked<SalesRepository> = {
  addSalesToUser: jest.fn(),
};

const mockGoalsRepository: jest.Mocked<GoalsRepository> = {
  addGoalToUser: jest.fn(),
};

// Mock do sessionStorage
const mockSessionStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

describe("DashboardController", () => {
  let controller: DashboardController;
  let mockContainer: jest.Mocked<DIContainer>;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Setup decrypt mock default behavior
    mockDecrypt.mockImplementation((value) => {
      if (!value || value === "") return "";
      return value; // Return the value as is for testing
    });

    // Setup DIContainer mock
    mockContainer = {
      getUserRepository: jest.fn().mockReturnValue(mockUserRepository),
      getProductionRepository: jest
        .fn()
        .mockReturnValue(mockProductionRepository),
      getSalesRepository: jest.fn().mockReturnValue(mockSalesRepository),
      getGoalsRepository: jest.fn().mockReturnValue(mockGoalsRepository),
      getDatabaseService: jest.fn(),
    } as any;

    (DIContainer.getInstance as jest.Mock).mockReturnValue(mockContainer);

    controller = new DashboardController();
  });

  describe("fetchUserData", () => {
    it("should return user data successfully", async () => {
      const mockUser: User = {
        production: [],
        sales: [],
        goals: { productionGoals: [], salesGoals: [] },
      } as User;

      mockUserRepository.getUserByUid.mockResolvedValue(
        Success.create(mockUser)
      );
      mockSessionStorage.getItem.mockReturnValue("encrypted-user-id");
      mockDecrypt.mockReturnValue("decrypted-user-id");

      const result = await controller.fetchUserData();

      expect(result).toEqual({
        productionList: [],
        salesList: [],
        goals: { productionGoals: [], salesGoals: [] },
      });
      expect(mockUserRepository.getUserByUid).toHaveBeenCalledWith(
        "decrypted-user-id"
      );
    });

    it("should return null when user ID is not found", async () => {
      mockSessionStorage.getItem.mockReturnValue(null);
      mockDecrypt.mockReturnValue(""); // decrypt retorna string vazia para null

      const result = await controller.fetchUserData();

      expect(result).toBeNull();
      expect(mockUserRepository.getUserByUid).not.toHaveBeenCalled();
    });

    it("should handle repository errors gracefully", async () => {
      mockUserRepository.getUserByUid.mockResolvedValue(
        Failure.create(new ValidationError("User not found"))
      );
      mockSessionStorage.getItem.mockReturnValue("test-user-id");
      mockDecrypt.mockReturnValue("test-user-id");

      const result = await controller.fetchUserData();

      expect(result).toBeNull();
    });
  });

  describe("addProduction", () => {
    it("should add production successfully", async () => {
      const mockProduction = {} as Production;
      mockProductionRepository.addProductionToUser.mockResolvedValue(
        Success.create(true)
      );
      mockSessionStorage.getItem.mockReturnValue("test-user-id");
      mockDecrypt.mockReturnValue("test-user-id");

      const result = await controller.addProduction(mockProduction);

      expect(result).toBe(true);
      expect(mockProductionRepository.addProductionToUser).toHaveBeenCalledWith(
        "test-user-id",
        mockProduction
      );
    });

    it("should handle production addition failure", async () => {
      const mockProduction = {} as Production;
      mockProductionRepository.addProductionToUser.mockResolvedValue(
        Failure.create(new ValidationError("Invalid production data"))
      );
      mockSessionStorage.getItem.mockReturnValue("test-user-id");
      mockDecrypt.mockReturnValue("test-user-id");

      const result = await controller.addProduction(mockProduction);

      expect(result).toBe(false);
    });

    it("should return false when user ID is not found", async () => {
      const mockProduction = {} as Production;
      mockSessionStorage.getItem.mockReturnValue(null);
      mockDecrypt.mockReturnValue(""); // decrypt retorna string vazia para null

      const result = await controller.addProduction(mockProduction);

      expect(result).toBe(false);
      expect(
        mockProductionRepository.addProductionToUser
      ).not.toHaveBeenCalled();
    });
  });
});
