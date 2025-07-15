import { useState, useEffect } from "react";
import { DashboardController } from "../controllers/DashboardController";
import Production, {
  getAllAvailableProducts,
} from "../../domain/models/farm/production/Production";
import SalesItem from "../../domain/models/farm/sales/SalesItem";
import Goals from "../../domain/models/farm/goals/Goals";
import Goal from "../../domain/models/farm/goals/Goal";
import Product from "../../domain/models/farm/product/Product";
import { GoalType } from "@repo/ui/dropdown";
import Tabs from "../tabsUtils";

const emptyGoals: Goals = { productionGoals: [], salesGoals: [] };

// Hook personalizado para gerenciar o estado e lógica do dashboard
export function useDashboard() {
  const [controller] = useState(() => new DashboardController());
  const [productionList, setProductionList] = useState<Production[]>([]);
  const [salesList, setSalesList] = useState<SalesItem[]>([]);
  const [goals, setGoals] = useState<Goals>(emptyGoals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTab, setShowTab] = useState(Tabs.production);

  const fetchAccount = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await controller.fetchUserData();

      if (data) {
        setProductionList(data.productionList);
        setSalesList(data.salesList);
        setGoals(data.goals);
      } else {
        setError("Erro ao carregar dados do usuário");
      }
    } catch (err) {
      console.error("Error fetching account:", err);
      setError("Erro ao carregar conta");
    } finally {
      setLoading(false);
    }
  };

  const addProduction = async (newProduction: Production): Promise<boolean> => {
    try {
      const success = await controller.addProduction(newProduction);
      if (success) {
        await fetchAccount();
      }
      return success;
    } catch (err) {
      console.error("Error adding production:", err);
      setError("Erro ao adicionar produção");
      return false;
    }
  };

  const addSalesItem = async (
    product: Product,
    quantity: number,
  ): Promise<boolean> => {
    try {
      const success = await controller.addSalesItem(product, quantity);
      if (success) {
        await fetchAccount();
      }
      return success;
    } catch (err) {
      console.error("Error adding sales item:", err);
      setError("Erro ao adicionar item de venda");
      return false;
    }
  };

  const addGoal = async (
    newGoal: Goal,
    goalType: GoalType,
  ): Promise<boolean> => {
    try {
      const success = await controller.addGoal(newGoal, goalType);
      if (success) {
        await fetchAccount();
      }
      return success;
    } catch (err) {
      console.error("Error adding goal:", err);
      setError("Erro ao adicionar meta");
      return false;
    }
  };

  const onProductionClick = () => {
    setShowTab(Tabs.production);
  };

  const onSalesClick = () => {
    setShowTab(Tabs.sales);
  };

  const onGoalsClick = () => {
    setShowTab(Tabs.goals);
  };

  // Carrega os dados iniciais
  useEffect(() => {
    fetchAccount();
  }, []);

  return {
    productionList,
    salesList,
    goals,
    loading,
    error,
    showTab,
    availableProducts: getAllAvailableProducts(productionList),
    addProduction,
    addSalesItem,
    addGoal,
    onProductionClick,
    onSalesClick,
    onGoalsClick,
    fetchAccount,
  };
}
