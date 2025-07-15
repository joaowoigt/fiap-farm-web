import { Text } from "@repo/ui/texts";
import SalesItem from "../../../domain/models/farm/sales/SalesItem";
import { SalesItemTable } from "./tableItem";
import Loading from "../../loading";

export interface SalesTableProps {
  sales: SalesItem[];
  loading: boolean;
}
export default function SalesTable({ sales, loading }: SalesTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3 bg-background p-3 rounded-md border-2">
        {" "}
        <Text intent="Regular" color="default" style="bold" text="Nome"></Text>
        <Text intent="Regular" color="default" style="bold" text="Tipo"></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Receita"
        ></Text>
      </div>
      {loading && <Loading />}
      {sales.length === 0 && (
        <div className="p-3">
          <Text
            intent="Small"
            color="default"
            text="Nenhuma venda encontrada. Adicione seu primeiro item para acompanhar as vendas da sua fazenda."
          />
        </div>
      )}
      {sales.map((item, index) => (
        <div key={index}>
          <SalesItemTable sales={item} />
        </div>
      ))}
    </div>
  );
}
