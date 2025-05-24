"use client";
import DashboardCenterArea from "./dashboard/centerArea/DashboardCenterArea";
import DashboardHeader from "./dashboard/DashboardHeader";
import DasboardSideMenu from "./dashboard/DashboardSideMenu";
import DashboardExtractArea from "./dashboard/extractArea/DashboardExtract";
import NewTransactionArea from "./dashboard/NewTransactionArea/NewTransactionArea";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import DashboardChartArea from "./dashboard/chartArea/DashboardChartArea";
import { DashboardRepositoryImpl } from "../data/repositories/DashboardRepositoryImpl";
import { StatementUseCaseImpl } from "../domain/useCases/statement/StatementUseCaseImpl";
import { AccountUseCaseImpl } from "../domain/useCases/account/AccountUseCaseImpl";
import { setBalance, setName } from "./features/balance/CenterAreaSlice";
import {
  setExtract,
  setTransactions,
} from "./features/transactions/transactionsSlices";
import store from "./store";
import { encrypt } from "../data/security/EncryptUtils";

const dashboardRepository = new DashboardRepositoryImpl();
const statementUseCase = new StatementUseCaseImpl(dashboardRepository);
const accountUseCase = new AccountUseCaseImpl(dashboardRepository);

export default function Page(): JSX.Element {
  const dispatch = useDispatch();

  async function fetchAccount() {
    const account = await accountUseCase.execute();
    sessionStorage.setItem("accountId", encrypt(account.id).encryptedData);
    dispatch(setName(account.name));
    const statement = await statementUseCase.execute(account.id);
    dispatch(setBalance(statement.balance));
    dispatch(setTransactions(statement.transactions));
    dispatch(setExtract());
  }

  useEffect(() => {
    fetchAccount();
  }, []);
  return (
    <Provider store={store}>
      <div className="bg-secondaryVariant w-auto h-auto flex flex-col mobile:w-full">
        <DashboardHeader></DashboardHeader>
        <div className="flex flex-row  mt-lg w-auto justify-center mobile:flex-col">
          <DasboardSideMenu></DasboardSideMenu>
          <div className=" w-[100%] max-w-[680px] flex flex-col mobile:w-full">
            <DashboardCenterArea></DashboardCenterArea>
            <NewTransactionArea></NewTransactionArea>
            <DashboardChartArea></DashboardChartArea>
          </div>
          <DashboardExtractArea></DashboardExtractArea>
        </div>
      </div>
    </Provider>
  );
}
