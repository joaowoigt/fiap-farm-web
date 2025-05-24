import { useSelector } from "react-redux";
import BalanceArea from "./BalanceArea";
import WelcomeArea from "./WelcomeArea";

export default function DashboardCenterArea() {
  return (
    <section className="bg-primary h-[420px] rounded-2xl flex flex-row  mx-6 justify-between p-6 mobile:flex-col mobile:items-center mobile:w-[312]">
      <WelcomeArea></WelcomeArea>
      <BalanceArea></BalanceArea>
    </section>
  );
}
