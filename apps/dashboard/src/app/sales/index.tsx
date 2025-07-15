import { Text } from "@repo/ui/texts";
import SalesItem from "../../domain/models/farm/sales/SalesItem";
import SalesTable from "./table";
import NewSales from "./newSales";
import Product from "../../domain/models/farm/product/Product";

interface SalesDashboardProps {
  sales: SalesItem[];
  products: Product[];
  onAddSale: (product: Product, quantity: number) => Promise<boolean>;
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
        text="Dashboard de Vendas"
      ></Text>
      <div className="flex flex-row">
        <SalesTable sales={sales} />
        <NewSales products={products} onAddSale={onAddSale} />
      </div>
    </div>
  );
}
