"use client";
import Header from "./header";
import ProductionDashboard from "./production";
import SalesDashboard from "./sales";
import GoalsDashboard from "./goals";
import Loading from "./loading";
import { useDashboard } from "./hooks/useDashboard";
import Tabs from "./tabsUtils";

export default function Page(): JSX.Element {
  const {
    productionList,
    salesList,
    goals,
    loading,
    error,
    showTab,
    availableProducts,
    addProduction,
    addSalesItem,
    addGoal,
    onProductionClick,
    onSalesClick,
    onGoalsClick,
  } = useDashboard();

  if (error) {
    return (
      <div className="bg-background h-full flex flex-col mobile:w-full">
        <div className="bg-white flex flex-col items-center h-full m-10 border-2 border-primary rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-error mb-4">Erro</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background h-full flex flex-col mobile:w-full">
      <div className="bg-white flex flex-col items-center h-full m-10 border-2 border-primary rounded-lg shadow-lg">
        <Header
          name=""
          onProductionClick={onProductionClick}
          onSalesClick={onSalesClick}
          onGoalsClick={onGoalsClick}
        />

        <div className="flex flex-col w-full p-4">
          {showTab === Tabs.production && (
            <ProductionDashboard
              loading={loading}
              production={productionList}
              onAddProduction={addProduction}
            />
          )}
          {showTab === Tabs.sales && (
            <SalesDashboard
              sales={salesList}
              products={availableProducts}
              onAddSale={addSalesItem}
              loading={loading}
            />
          )}
          {showTab === Tabs.goals && (
            <GoalsDashboard
              goals={goals}
              onAddGoal={addGoal}
              loading={loading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
