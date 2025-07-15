import { Text } from "@repo/ui/texts";
import Goal from "../../../domain/models/farm/goals/Goal.ts";
import { GoalsItemTable } from "./tableItem.tsx";
import Loading from "../../loading/index.tsx";

interface GoalsTableProps {
  productionGoals: Goal[];
  salesGoals: Goal[];
  loading: boolean;
}

export default function GoalsTable({
  salesGoals,
  productionGoals,
  loading,
}: GoalsTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3 bg-background p-3 rounded-md border-2">
        {" "}
        <Text intent="Regular" color="default" style="bold" text="Tipo"></Text>
        <Text intent="Regular" color="default" style="bold" text="Meta"></Text>
        <Text intent="Regular" color="default" style="bold" text="Atual"></Text>
      </div>
      <div className="p-3">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Metas de Produção"
        ></Text>{" "}
        {loading && <Loading />}
        {productionGoals.length === 0 ? (
          <div className="p-3">
            <Text
              intent="Small"
              color="default"
              text="Nenhuma meta de produção encontrada. Adicione sua primeira meta para acompanhar o progresso da sua fazenda."
            />
          </div>
        ) : (
          productionGoals.map((goal, index) => (
            <div key={index}>
              <GoalsItemTable goal={goal} type="production" />
            </div>
          ))
        )}
      </div>
      <div className="w-full h-0.5 bg-primary-light" />
      <div className="p-3">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Metas de Vendas"
        ></Text>{" "}
        {salesGoals.length === 0 ? (
          <div className="p-3">
            <Text
              intent="Small"
              color="default"
              text="Nenhuma meta de vendas encontrada. Adicione sua primeira meta para acompanhar o progresso da sua fazenda."
            />
          </div>
        ) : (
          salesGoals.map((goal, index) => (
            <div key={index}>
              <GoalsItemTable goal={goal} type="sales" />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
