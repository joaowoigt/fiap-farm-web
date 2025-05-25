"use client";
import { useEffect, useState } from "react";
import { decrypt } from "../data/security/EncryptUtils";
import { getUserUseCaseImpl } from "../domain/useCases/farm/GetUserUseCaseImpl";

const getUserUseCase = getUserUseCaseImpl;

export default function Page(): JSX.Element {
  const [name, setName] = useState("");

  async function fetchAccount() {
    const userId = decrypt(sessionStorage.getItem("farmUser") ?? "");
    const user = await getUserUseCase.execute(userId);
    setName(user?.production[0].product.name ?? "");
  }

  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <div className="bg-background w-auto h-full flex flex-col mobile:w-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-3xl font-bold text-primary">Hello, {name}</h1>
        <p className="text-lg text-secondary">Welcome to your farm</p>
      </div>
    </div>
  );
}
