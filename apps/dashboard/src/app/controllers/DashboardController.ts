import { useState } from "react";
import { DIContainer } from "../../domain/di/DIContainer";
import { decrypt } from "../../data/security/EncryptUtils";
import Production from "../../domain/models/farm/production/Production";
import SalesItem, { createSalesItem } from "../../domain/models/farm/sales/SalesItem";
import Product from "../../domain/models/farm/product/Product";
import Goals from "../../domain/models/farm/goals/Goals";
import Goal from "../../domain/models/farm/goals/Goal";
import { GoalType } from "@repo/ui/dropdown";

/**
 * Controller que gerencia o estado e lógica de negócio do Dashboard
 * Segue o princípio de Responsabilidade Única (SRP)
 */
export class DashboardController {
  private diContainer: DIContainer;
  
  constructor() {
    this.diContainer = DIContainer.getInstance();
  }
  /**
   * Busca e retorna os dados do usuário
   */
  async fetchUserData(userId: string): Promise<{
    productionList: Production[];
    salesList: SalesItem[];
    goals: Goals;
  }> {
    try {
      const getUserUseCase = this.diContainer.getGetUserUseCase();
      const userResult = await getUserUseCase.execute(userId);
      
      if (userResult.isFailure) {
        throw new Error(userResult.error.message);
      }
      
      const user = userResult.value;
      
      return {
        productionList: user?.production ?? [],
        salesList: user?.sales ?? [],
        goals: user?.goals ?? { productionGoals: [], salesGoals: [] }
      };
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      throw new Error("Falha ao carregar dados do usuário");
    }
  }
  /**
   * Adiciona uma nova produção
   */
  async addProduction(userId: string, newProduction: Production): Promise<boolean> {
    try {
      const addProductionUseCase = this.diContainer.getAddProductionUseCase();
      const result = await addProductionUseCase.execute(userId, newProduction);
      
      if (result.isFailure) {
        console.error("Erro ao adicionar produção:", result.error.message);
        return false;
      }
      
      return result.value;
    } catch (error) {
      console.error("Erro ao adicionar produção:", error);
      throw new Error("Falha ao adicionar produção");
    }
  }
  /**
   * Adiciona um novo item de venda
   */
  async addSalesItem(userId: string, product: Product, quantity: number): Promise<boolean> {
    try {
      const addSalesItemUseCase = this.diContainer.getAddSalesItemUseCase();
      const salesItem = createSalesItem(product, quantity);
      const result = await addSalesItemUseCase.execute(userId, salesItem);
      
      if (result.isFailure) {
        console.error("Erro ao adicionar venda:", result.error.message);
        return false;
      }
      
      return result.value;
    } catch (error) {
      console.error("Erro ao adicionar venda:", error);
      throw new Error("Falha ao adicionar venda");
    }
  }
  /**
   * Adiciona uma nova meta
   */
  async addGoal(userId: string, newGoal: Goal, goalType: GoalType): Promise<boolean> {
    try {
      const addGoalUseCase = this.diContainer.getAddGoalUseCase();
      const result = await addGoalUseCase.execute(userId, newGoal, goalType);
      
      if (result.isFailure) {
        console.error("Erro ao adicionar meta:", result.error.message);
        return false;
      }
      
      return result.value;
    } catch (error) {
      console.error("Erro ao adicionar meta:", error);
      throw new Error("Falha ao adicionar meta");
    }
  }

  /**
   * Extrai o ID do usuário do sessionStorage
   */
  getUserIdFromSession(): string {
    const encryptedUserId = sessionStorage.getItem("farmUser") ?? "";
    return decrypt(encryptedUserId);
  }
}

/**
 * Hook personalizado para gerenciar o estado do Dashboard
 * Implementa a separação de concerns e facilita os testes
 */
export function useDashboard() {
  const [name] = useState("");
  const [productionList, setProductionList] = useState<Production[]>([]);
  const [salesList, setSalesList] = useState<SalesItem[]>([]);
  const [goals, setGoals] = useState<Goals>({ productionGoals: [], salesGoals: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const controller = new DashboardController();

  const fetchAccount = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userId = controller.getUserIdFromSession();
      const userData = await controller.fetchUserData(userId);
      
      setProductionList(userData.productionList);
      setSalesList(userData.salesList);
      setGoals(userData.goals);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const addProduction = async (newProduction: Production): Promise<boolean> => {
    try {
      const userId = controller.getUserIdFromSession();
      const success = await controller.addProduction(userId, newProduction);
      
      if (success) {
        await fetchAccount();
      }
      
      return success;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao adicionar produção");
      return false;
    }
  };

  const addSalesItem = async (product: Product, quantity: number): Promise<boolean> => {
    try {
      const userId = controller.getUserIdFromSession();
      const success = await controller.addSalesItem(userId, product, quantity);
      
      if (success) {
        await fetchAccount();
      }
      
      return success;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao adicionar venda");
      return false;
    }
  };

  const addGoal = async (newGoal: Goal, goalType: GoalType): Promise<boolean> => {
    try {
      const userId = controller.getUserIdFromSession();
      const success = await controller.addGoal(userId, newGoal, goalType);
      
      if (success) {
        await fetchAccount();
      }
      
      return success;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao adicionar meta");
      return false;
    }
  };

  return {
    name,
    productionList,
    salesList,
    goals,
    loading,
    error,
    fetchAccount,
    addProduction,
    addSalesItem,
    addGoal
  };
}
