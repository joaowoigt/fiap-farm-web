"use client";
import { useEffect, useState } from "react";
import Header from "./header";
import Tabs from "./tabsUtils";
import ProductionDashboard from "./production";
import Production, {
  getAllAvailableProducts,
} from "../domain/models/farm/production/Production";
import SalesDashboard from "./sales";
import Product from "../domain/models/farm/product/Product";
import Loading from "./loading";
import GoalsDashboard from "./goals";
import Goal from "../domain/models/farm/goals/Goal";
import { GoalType } from "@repo/ui/dropdown";
import { useDashboard } from "./controllers/DashboardController";

export default function Page(): JSX.Element {
  const [showTab, setShowTab] = useState(Tabs.production);
  const {
    name,
    productionList,
    salesList,
    goals,
    loading,
    error,
    fetchAccount,
    addProduction,
    addSalesItem,
    addGoal,
  } = useDashboard();

  const onProductionClick = () => {
    setShowTab(Tabs.production);
    console.log("Production clicked");
  };

  const onSalesClick = () => {
    setShowTab(Tabs.sales);
    console.log("Sales clicked");
  };

  const onGoalsClick = () => {
    setShowTab(Tabs.goals);
    console.log("Goals clicked");
  };

  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="bg-background h-full flex flex-col mobile:w-full">
      <div className="bg-white flex flex-col items-center h-full m-10 border-2 border-primary rounded-lg shadow-lg">
        <Header
          name={name}
          onProductionClick={onProductionClick}
          onSalesClick={onSalesClick}
          onGoalsClick={onGoalsClick}
        />
        {loading && Loading()}
        {error && <div className="text-red-500 p-4">Erro: {error}</div>}

        {!loading && !error && (
          <div className="flex flex-col w-full p-4">
            {showTab === Tabs.production && (
              <ProductionDashboard
                production={productionList}
                onAddProduction={addProduction}
              />
            )}
            {showTab === Tabs.sales && (
              <SalesDashboard
                sales={salesList}
                products={getAllAvailableProducts(productionList)}
                onAddSale={addSalesItem}
              />
            )}
            {showTab === Tabs.goals && (
              <GoalsDashboard goals={goals} onAddGoal={addGoal} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
