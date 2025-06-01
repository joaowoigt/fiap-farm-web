import { Text } from "@repo/ui/texts";
import Production from "../../domain/models/farm/production/Production";
import SalesItem from "../../domain/models/farm/sales/SalesItem";
import SalesTable from "./table";

interface SalesDashboardProps {
  sales: SalesItem[];
  products: Production[];
  onAddSale: (sale: SalesItem) => Promise<boolean>;
}

export default function SalesDashboard({
  sales,
  products,
  onAddSale,
}: SalesDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Sales Dashboard"
      ></Text>
      <div className="flex flex-row">
        <SalesTable sales={sales} />
        {/* New Sale Component would go here */}
      </div>
    </div>
  );
}
