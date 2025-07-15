import { Text } from "@repo/ui/texts";
import ProductionTable from "./table";
import Production from "../../domain/models/farm/production/Production";
import NewProduction from "./newProduction";
import Loading from "../loading";

interface ProductionDashboardProps {
  production: Production[];
  onAddProduction: (production: Production) => Promise<boolean>;
  loading: boolean;
}

export default function ProductionDashboard({
  production,
  onAddProduction,
  loading,
}: ProductionDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Dashboard de Produção"
      ></Text>{" "}
      <div className="flex flex-row">
        <ProductionTable production={production} loading={loading} />
        <NewProduction onAddProduction={onAddProduction} />
      </div>
    </div>
  );
}
