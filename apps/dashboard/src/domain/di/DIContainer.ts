import { UserRepository } from "../repositories/user-repository";
import { ProductionRepository } from "../repositories/production-repository";
import { SalesRepository } from "../repositories/sales-repository";
import { GoalsRepository } from "../repositories/goals-repository";
import { DatabaseService } from "../services/DatabaseService";
import { FirebaseDatabaseService } from "../../data/services/FirebaseDatabaseService";
import { FirebaseUserRepository } from "../../data/firebase/user/firebase-user-repository";
import { FirebaseProductionRepository } from "../../data/firebase/production/firebase-production-repository";
import { FirebaseSalesRepository } from "../../data/firebase/sales/firebase-sales-repository";
import { FirebaseGoalsRepository } from "../../data/firebase/goals/firebase-goals-repository";
import { db, auth } from "../../data/firebase/clientApp";

// Dependency Injection Container seguindo o padrão Singleton
export class DIContainer {
  private static instance: DIContainer;
  private databaseService: DatabaseService;
  private userRepository: UserRepository;
  private productionRepository: ProductionRepository;
  private salesRepository: SalesRepository;
  private goalsRepository: GoalsRepository;

  private constructor() {
    // Inicializar serviços
    this.databaseService = new FirebaseDatabaseService(db);

    // Inicializar repositórios com as dependências
    this.userRepository = new FirebaseUserRepository(db);
    this.productionRepository = new FirebaseProductionRepository(db);
    this.salesRepository = new FirebaseSalesRepository(db);
    this.goalsRepository = new FirebaseGoalsRepository(db);
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Getters para os repositórios
  getUserRepository(): UserRepository {
    return this.userRepository;
  }

  getProductionRepository(): ProductionRepository {
    return this.productionRepository;
  }

  getSalesRepository(): SalesRepository {
    return this.salesRepository;
  }

  getGoalsRepository(): GoalsRepository {
    return this.goalsRepository;
  }

  getDatabaseService(): DatabaseService {
    return this.databaseService;
  }
}
