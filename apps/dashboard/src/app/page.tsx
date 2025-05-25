"use client";
import { useEffect, useState } from "react";
import { decrypt } from "../data/security/EncryptUtils";
import { getUserUseCaseImpl } from "../domain/useCases/farm/GetUserUseCaseImpl";
import Header from "./header";
import Tabs from "./tabsUtils";
import ProductionDashboard from "./production";
import Production from "../domain/models/farm/production/Production";
import { Type } from "../domain/models/farm/product/Type";
import { Status } from "../domain/models/farm/production/Status";

// Mocks

const mockedProductionList: Production[] = [
  {
    product: {
      name: "Tomate",
      type: Type.crops,
      unitValue: 2.5,
    },
    quantity: 100,
    status: Status.inProgress,
  },
  {
    product: {
      name: "Porco",
      type: Type.livestock,
      unitValue: 100.0,
    },
    quantity: 20,
    status: Status.done,
  },
  {
    product: {
      name: "Leite",
      type: Type.dairy,
      unitValue: 10.0,
    },
    quantity: 50,
    status: Status.waiting,
  },
  {
    product: {
      name: "Tomate",
      type: Type.crops,
      unitValue: 2.5,
    },
    quantity: 100,
    status: Status.inProgress,
  },
  {
    product: {
      name: "Porco",
      type: Type.livestock,
      unitValue: 100.0,
    },
    quantity: 20,
    status: Status.done,
  },
];

const getUserUseCase = getUserUseCaseImpl;

export default function Page(): JSX.Element {
  const [name, setName] = useState("");
  const [showTab, setShowTab] = useState(Tabs.production);
  const [productionList, setProductionList] =
    useState<Production[]>(mockedProductionList);

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
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");
    const user = await getUserUseCase.execute(userId);
    setName(user?.production[0].product.name ?? "");
  }

  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="bg-background h-full flex flex-col mobile:w-full">
      <div className="bg-white flex flex-col items-center h-full m-10 border-2 border-primary rounded-lg shadow-lg">
        <Header
          name="João Farm"
          onProductionClick={onProductionClick}
          onSalesClick={onSalesClick}
          onGoalsClick={onGoalsClick}
        />
        <div className="flex flex-col w-full p-4">
          {showTab === Tabs.production && (
            <ProductionDashboard
              production={productionList}
              onAddProduction={(newProduction: Production) => {
                const newList = [...productionList, newProduction];
                setProductionList(newList);
              }}
            />
          )}
          {showTab === Tabs.sales && (
            <div className="text-4xl font-bold mb-4">Sales Dashboard</div>
          )}
          {showTab === Tabs.goals && (
            <div className="text-4xl font-bold mb-4">Goals Dashboard</div>
          )}
        </div>
      </div>
    </div>
  );
}
