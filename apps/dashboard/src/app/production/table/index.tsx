import { Text } from "@repo/ui/texts";
import Production from "../../../domain/models/farm/production/Production";
import ProductionItemTable from "./tableItem";
import Loading from "../../loading";

export interface ProductionTableProps {
  production: Production[];
  loading: boolean;
}

export default function ProductionTable({
  production,
  loading,
}: ProductionTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3  bg-background p-3 rounded-md border-2">
        {" "}
        <Text intent="Regular" color="default" style="bold" text="Nome"></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Quantidade"
        ></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Status"
        ></Text>
      </div>
      {loading && <Loading />}
      {production.length === 0 && (
        <div className="p-3">
          <Text
            intent="Small"
            color="default"
            text="Nenhuma produção encontrada. Adicione seu primeiro item para acompanhar a produção da sua fazenda."
          />
        </div>
      )}
      {production.map((item, index) => (
        <div key={index}>
          <ProductionItemTable production={item} />
        </div>
      ))}
    </div>
  );
}
