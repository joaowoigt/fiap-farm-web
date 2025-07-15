import { AuthRepository } from "../repositories/auth-repository";
import { FirebaseAuthRepository } from "../../data/firebase/Auth/firebase-auth-repository";
import { auth } from "../../data/firebase/clientApp";

// Dependency Injection Container seguindo o padrão Singleton
export class DIContainer {
  private static instance: DIContainer;
  private authRepository: AuthRepository;

  private constructor() {
    // Inicializar repositórios com as dependências
    this.authRepository = new FirebaseAuthRepository(auth);
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  // Getter para o repositório de autenticação
  getAuthRepository(): AuthRepository {
    return this.authRepository;
  }
}
