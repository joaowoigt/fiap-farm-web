import { Text } from "@repo/ui/texts";
import ProductionTable from "./table";
import Production from "../../domain/models/farm/production/Production";

interface ProductionDashboardProps {
  production: Production[];
}

export default function ProductionDashboard({
  production,
}: ProductionDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Production Dashboard"
      ></Text>
      <ProductionTable production={production} />
    </div>
  );
}
