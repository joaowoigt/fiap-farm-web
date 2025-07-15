import { useState } from "react";
import { DIContainer } from "../../domain/di/DIContainer";
import { GetUserUseCase } from "../../domain/useCases/farm/GetUserUseCase";
import { AddProductionUseCase } from "../../domain/useCases/farm/production/AddProductionUseCase";
import { AddSalesItemUseCase } from "../../domain/useCases/farm/sales/AddSalesItemUseCase";
import { AddGoalUseCase } from "../../domain/useCases/farm/goals/AddGoalUseCase";
import { UserRepository } from "../../domain/repositories/user-repository";
import { ProductionRepository } from "../../domain/repositories/production-repository";
import { SalesRepository } from "../../domain/repositories/sales-repository";
import { GoalsRepository } from "../../domain/repositories/goals-repository";
import Production from "../../domain/models/farm/production/Production";
import SalesItem, {
  createSalesItem,
} from "../../domain/models/farm/sales/SalesItem";
import Goals from "../../domain/models/farm/goals/Goals";
import Goal from "../../domain/models/farm/goals/Goal";
import Product from "../../domain/models/farm/product/Product";
import User from "../../domain/models/farm/user/User";
import { GoalType } from "@repo/ui/dropdown";
import { decrypt } from "../../data/security/EncryptUtils";
import { Result } from "../../domain/common/Result";

// Controller seguindo o padrão SRP - responsável apenas pela lógica de negócio do dashboard
export class DashboardController {
  private getUserUseCase: GetUserUseCase;
  private addProductionUseCase: AddProductionUseCase;
  private addSalesItemUseCase: AddSalesItemUseCase;
  private addGoalsUseCase: AddGoalUseCase;

  constructor() {
    const container = DIContainer.getInstance();

    // Injeção de dependências através do container
    this.getUserUseCase = new GetUserUseCaseImpl(container.getUserRepository());
    this.addProductionUseCase = new AddProductionUseCaseImpl(
      container.getProductionRepository()
    );
    this.addSalesItemUseCase = new AddSalesItemUseCaseImpl(
      container.getSalesRepository()
    );
    this.addGoalsUseCase = new AddGoalUseCaseImpl(
      container.getGoalsRepository()
    );
  }

  async fetchUserData(): Promise<{
    productionList: Production[];
    salesList: SalesItem[];
    goals: Goals;
  } | null> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");

    if (!userId) {
      console.error("User ID not found");
      return null;
    }

    try {
      const userResult = await this.getUserUseCase.execute(userId);

      return userResult.match(
        (user) => ({
          productionList: user?.production ?? [],
          salesList: user?.sales ?? [],
          goals: user?.goals ?? { productionGoals: [], salesGoals: [] },
        }),
        (error) => {
          console.error("Error fetching user data:", error);
          return null;
        }
      );
    } catch (error) {
      console.error("Error in fetchUserData:", error);
      return null;
    }
  }

  async addProduction(newProduction: Production): Promise<boolean> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");

    if (!userId) {
      console.error("User ID not found");
      return false;
    }

    try {
      const result = await this.addProductionUseCase.execute(
        userId,
        newProduction
      );

      return result.match(
        (success) => success,
        (error) => {
          console.error("Error adding production:", error);
          return false;
        }
      );
    } catch (error) {
      console.error("Error in addProduction:", error);
      return false;
    }
  }

  async addSalesItem(product: Product, quantity: number): Promise<boolean> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");

    if (!userId) {
      console.error("User ID not found");
      return false;
    }

    try {
      const salesItem = createSalesItem(product, quantity);
      const result = await this.addSalesItemUseCase.execute(userId, salesItem);

      return result.match(
        (success) => success,
        (error) => {
          console.error("Error adding sales item:", error);
          return false;
        }
      );
    } catch (error) {
      console.error("Error in addSalesItem:", error);
      return false;
    }
  }

  async addGoal(newGoal: Goal, goalType: GoalType): Promise<boolean> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");

    if (!userId) {
      console.error("User ID not found");
      return false;
    }

    try {
      const result = await this.addGoalsUseCase.execute(
        userId,
        newGoal,
        goalType
      );

      return result.match(
        (success) => success,
        (error) => {
          console.error("Error adding goal:", error);
          return false;
        }
      );
    } catch (error) {
      console.error("Error in addGoal:", error);
      return false;
    }
  }
}

// Implementações dos Use Cases atualizadas para usar o DI Container
class GetUserUseCaseImpl implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(uid: string): Promise<Result<User | null>> {
    const userResult = await this.userRepository.getUserByUid(uid);

    return userResult.map((user) => {
      if (user && user.sales) {
        user.sales = user.sales.sort((a: SalesItem, b: SalesItem) => {
          return b.income - a.income;
        });
      }
      return user;
    });
  }
}

class AddProductionUseCaseImpl implements AddProductionUseCase {
  constructor(private productionRepository: ProductionRepository) {}

  async execute(
    userId: string,
    production: Production
  ): Promise<Result<boolean>> {
    return await this.productionRepository.addProductionToUser(
      userId,
      production
    );
  }
}

class AddSalesItemUseCaseImpl implements AddSalesItemUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute(
    userId: string,
    salesItem: SalesItem
  ): Promise<Result<boolean>> {
    return await this.salesRepository.addSalesToUser(userId, salesItem);
  }
}

class AddGoalUseCaseImpl implements AddGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute(
    userId: string,
    newGoal: Goal,
    goalType: GoalType
  ): Promise<Result<boolean>> {
    return await this.goalsRepository.addGoalToUser(userId, newGoal, goalType);
  }
}
