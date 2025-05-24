import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import {
  selectCreditValue,
  selectDebitValue,
} from "../../selectors/TransactionSelectors";

export default function DashboardChartArea() {
  const debitValue = useSelector(selectDebitValue);
  const creditValue = useSelector(selectCreditValue);
  ChartJS.register([ArcElement, Tooltip, Legend]);
  ChartJS.defaults.font.size = 24;
  ChartJS.defaults.color = "white";
  const data = {
    labels: ["Débito", "Crédito"],
    datasets: [
      {
        data: [debitValue, creditValue],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <section className="bg-primary h-[420px] rounded-2xl flex flex-row  m-lg justify-center p-lg mobile:flex-col mobile:items-center mobile:w-[312]">
      <Pie data={data}></Pie>
    </section>
  );
}
