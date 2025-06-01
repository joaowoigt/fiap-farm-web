"use client";
import { useEffect, useState } from "react";
import { decrypt } from "../data/security/EncryptUtils";
import { getUserUseCaseImpl } from "../domain/useCases/farm/GetUserUseCaseImpl";
import Header from "./header";
import Tabs from "./tabsUtils";
import ProductionDashboard from "./production";
import Production, {
  getAllAvailableProducts,
} from "../domain/models/farm/production/Production";
import { addProductionUseCaseImpl } from "../domain/useCases/farm/production/AddProductionUseCaseImpls";
import SalesDashboard from "./sales";
import SalesItem, {
  createSalesItem,
} from "../domain/models/farm/sales/SalesItem";
import { addSalesItemUseCaseImpl } from "../domain/useCases/farm/sales/AddSalesItemUseCaseImpl";
import Product from "../domain/models/farm/product/Product";
import Loading from "./loading";
import GoalsDashboard from "./goals";
import Goals from "../domain/models/farm/goals/Goals";
import { Type } from "../domain/models/farm/product/Type";

const getUserUseCase = getUserUseCaseImpl;
const addProductionUseCase = addProductionUseCaseImpl;
const addSalesItemUseCase = addSalesItemUseCaseImpl;

const emptyGoals: Goals = { productionGoals: [], salesGoals: [] };

// Mock
const mockedGoals: Goals = {
  productionGoals: [
    { type: Type.crops, goal: 100, current: 50 },
    { type: Type.livestock, goal: 200, current: 150 },
  ],
  salesGoals: [
    { type: Type.crops, goal: 5000, current: 3000 },
    { type: Type.livestock, goal: 10000, current: 7000 },
  ],
};

export default function Page(): JSX.Element {
  const [name, setName] = useState("");
  const [showTab, setShowTab] = useState(Tabs.production);
  const [productionList, setProductionList] = useState<Production[]>([]);
  const [salesList, setSalesList] = useState<SalesItem[]>([]);
  const [goals, setGoals] = useState<Goals>(emptyGoals);
  const [loading, setLoading] = useState(true);

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

  async function fetchAccount() {
    setLoading(true);
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");
    const user = await getUserUseCase.execute(userId);
    setName(user?.production[0].product.name ?? "");
    setProductionList(user?.production ?? []);
    setSalesList(user?.sales ?? []);
    setGoals(user?.goals ?? emptyGoals);
    setLoading(false);
  }

  async function addProduction(newProduction: Production): Promise<boolean> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");
    const success = await addProductionUseCase.execute(userId, newProduction);
    if (success) {
      setProductionList((prev) => [...prev, newProduction]);
    }
    return success;
  }

  async function addSalesItem(
    product: Product,
    quantity: number
  ): Promise<boolean> {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");
    const salesItem = createSalesItem(product, quantity);
    const success = await addSalesItemUseCase.execute(userId, salesItem);
    if (success) {
      fetchAccount();
    }
    return success;
  }

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

        {!loading && (
          <div className="flex flex-col w-full p-4">
            {showTab === Tabs.production && (
              <ProductionDashboard
                production={productionList}
                onAddProduction={(newProduction: Production) => {
                  return addProduction(newProduction);
                }}
              />
            )}
            {showTab === Tabs.sales && (
              <SalesDashboard
                sales={salesList}
                products={getAllAvailableProducts(productionList)}
                onAddSale={(product: Product, quantity: number) =>
                  addSalesItem(product, quantity)
                }
              />
            )}
            {showTab === Tabs.goals && <GoalsDashboard goals={mockedGoals} />}
          </div>
        )}
      </div>
    </div>
  );
}
