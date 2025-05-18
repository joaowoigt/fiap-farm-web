import { Button } from "@repo/ui/buttons";
import { Dropdown, TransactionType } from "@repo/ui/dropdown";
import { Text } from "@repo/ui/texts";
import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { DashboardRepositoryImpl } from "../../../data/repositories/DashboardRepositoryImpl";
import { NewTransactionUseCaseImpl } from "../../../domain/useCases/newTransaction/NewTransactionUseCaseImpl";
import { decrypt } from "../../../data/security/EncryptUtils";

const dashboardRepository = new DashboardRepositoryImpl();
const newTransactionUseCase = new NewTransactionUseCaseImpl(
  dashboardRepository
);

export default function NewTransactionArea() {
  const [value, setValue] = useState<number>(0.0);
  const [type, setType] = useState<string>("");

  const onSelectedType = (type: string) => {
    setType(type);
  };

  const onChange = (text: number) => {
    setValue(text);
  };

  async function addTransaction() {
    const newTransactionSuccess = await newTransactionUseCase.execute(
      value,
      type,
      decrypt(sessionStorage.getItem("accountId") ?? "")
    );
    if (newTransactionSuccess) {
      window.location.reload();
    } else {
      alert("Erro ao adicionar transação");
    }
  }

  return (
    <div className="bg-grayVariant h-[420px] rounded-2xl flex flex-col  mx-big p-big mt-big mobile:items-center">
      <Text intent="Heading" color="white" text="Nova transação"></Text>
      <div className="my-extraBig">
        <Dropdown
          onSelect={(item: TransactionType) => onSelectedType(item)}
        ></Dropdown>
      </div>
      <Text intent="Regular" color="white" text="Valor"></Text>
      <CurrencyInput
        decimalsLimit={2}
        onValueChange={(value, name, values) =>
          onChange(values?.float as number)
        }
        prefix="R$"
        className="outline outline-1 outline-primary  mb-big mt-medium bg-white rounded-md px-small w-[250px]  py-small text-black text-start flex flex-row hover:cursor-text"
      />
      <div className="w-[250px] mobile:w-full mobile:items-center mobile:flex mobile:flex-col">
        <Button
          intent="primary"
          text="Concluir transação"
          onClick={(event) => {
            addTransaction();
          }}
        ></Button>
      </div>
    </div>
  );
}
