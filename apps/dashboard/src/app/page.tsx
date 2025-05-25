"use client";
import { useEffect, useState } from "react";
import { decrypt } from "../data/security/EncryptUtils";
import { getUserUseCaseImpl } from "../domain/useCases/farm/GetUserUseCaseImpl";
import Header from "./header";

const getUserUseCase = getUserUseCaseImpl;

export default function Page(): JSX.Element {
  const [name, setName] = useState("");

  const onProductionClick = () => {
    console.log("Production clicked");
  };

  const onSalesClick = () => {
    console.log("Sales clicked");
  };

  const onGoalsClick = () => {
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
    <div className="bg-background h-screen flex flex-col mobile:w-full">
      <div className="bg-white flex flex-col items-center h-full m-10 border-2 border-primary rounded-lg shadow-lg">
        <Header
          name="João Farm"
          onProductionClick={onProductionClick}
          onSalesClick={onSalesClick}
          onGoalsClick={onGoalsClick}
        />
      </div>
    </div>
  );
}
