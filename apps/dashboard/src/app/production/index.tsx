import { Text } from "@repo/ui/texts";
import ProductionTable from "./table";
import Production from "../../domain/models/farm/production/Production";
import NewProduction from "./newProduction";

interface ProductionDashboardProps {
  production: Production[];
  onAddProduction: (production: Production) => void;
}

export default function ProductionDashboard({
  production,
  onAddProduction,
}: ProductionDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Production Dashboard"
      ></Text>
      <div className="flex flex-row">
        <ProductionTable production={production} />
        <NewProduction onAddProduction={onAddProduction} />
      </div>
    </div>
  );
}
