// Dependency Injection Container
// Implementa o padrão de Inversão de Dependência (DIP) do SOLID

import { Firestore } from "firebase/firestore";
import { auth, db } from "../../data/firebase/clientApp";

// Services
import { DatabaseService } from "../services/DatabaseService";
import { FirebaseDatabaseService } from "../../data/services/FirebaseDatabaseService";

// Repositories
import { GoalsRepository } from "../repositories/goals-repository";
import { ProductionRepository } from "../repositories/production-repository";
import { SalesRepository } from "../repositories/sales-repository";
import { UserRepository } from "../repositories/user-repository";

import { FirebaseGoalsRepository } from "../../data/firebase/goals/firebase-goals-repository";
import { FirebaseProductionRepository } from "../../data/firebase/production/firebase-production-repository";
import { FirebaseSalesRepository } from "../../data/firebase/sales/firebase-sales-repository";
import { ImprovedUserRepository } from "../../data/repositories/ImprovedUserRepository";

// Use Cases
import { GetUserUseCase } from "../useCases/farm/GetUserUseCase";
import { AddProductionUseCase } from "../useCases/farm/production/AddProductionUseCase";
import { AddSalesItemUseCase } from "../useCases/farm/sales/AddSalesItemUseCase";
import { AddGoalUseCase } from "../useCases/farm/goals/AddGoalUseCase";

import { GetUserUseCaseImpl } from "../useCases/farm/GetUserUseCaseImpl";
import { AddProductionUseCaseImpl } from "../useCases/farm/production/AddProductionUseCaseImpls";
import { AddSalesItemUseCaseImpl } from "../useCases/farm/sales/AddSalesItemUseCaseImpl";
import { AddGoalUseCaseImpl } from "../useCases/farm/goals/AddGoalUseCaseImpl";

/**
 * Container de Injeção de Dependência seguindo os princípios SOLID
 * Centraliza a criação e configuração de dependências
 */
export class DIContainer {
  private static instance: DIContainer;

  // Services
  private databaseService!: DatabaseService;

  // Repositories
  private goalsRepository!: GoalsRepository;
  private productionRepository!: ProductionRepository;
  private salesRepository!: SalesRepository;
  private userRepository!: UserRepository;

  // Use Cases
  private getUserUseCase!: GetUserUseCase;
  private addProductionUseCase!: AddProductionUseCase;
  private addSalesItemUseCase!: AddSalesItemUseCase;
  private addGoalUseCase!: AddGoalUseCase;

  private constructor() {
    this.initializeServices();
    this.initializeRepositories();
    this.initializeUseCases();
  }

  public static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private initializeServices(): void {
    this.databaseService = new FirebaseDatabaseService(db);
  }

  private initializeRepositories(): void {
    this.goalsRepository = new FirebaseGoalsRepository(db);
    this.productionRepository = new FirebaseProductionRepository(db);
    this.salesRepository = new FirebaseSalesRepository(db);
    this.userRepository = new ImprovedUserRepository(this.databaseService);
  }

  private initializeUseCases(): void {
    this.getUserUseCase = new GetUserUseCaseImpl(this.userRepository);
    this.addProductionUseCase = new AddProductionUseCaseImpl(
      this.productionRepository
    );
    this.addSalesItemUseCase = new AddSalesItemUseCaseImpl(
      this.salesRepository
    );
    this.addGoalUseCase = new AddGoalUseCaseImpl(this.goalsRepository);
  }

  // Getters para os Use Cases
  public getGetUserUseCase(): GetUserUseCase {
    return this.getUserUseCase;
  }

  public getAddProductionUseCase(): AddProductionUseCase {
    return this.addProductionUseCase;
  }

  public getAddSalesItemUseCase(): AddSalesItemUseCase {
    return this.addSalesItemUseCase;
  }

  public getAddGoalUseCase(): AddGoalUseCase {
    return this.addGoalUseCase;
  }

  // Getters para os Repositories (se necessário para testes)
  public getGoalsRepository(): GoalsRepository {
    return this.goalsRepository;
  }

  public getProductionRepository(): ProductionRepository {
    return this.productionRepository;
  }

  public getSalesRepository(): SalesRepository {
    return this.salesRepository;
  }

  public getUserRepository(): UserRepository {
    return this.userRepository;
  }
}
