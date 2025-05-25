import { Text } from "@repo/ui/texts";
import Production from "../../../domain/models/farm/production/Production";
import ProductionItemTable from "./tableItem";

export interface ProductionTableProps {
  production: Production[];
}

export default function ProductionTable({ production }: ProductionTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3  bg-background p-3 rounded-md border-2">
        <Text intent="Regular" color="default" style="bold" text="Name"></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Quantity"
        ></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Status"
        ></Text>
      </div>
      {production.map((item, index) => (
        <div key={index}>
          <ProductionItemTable production={item} />
        </div>
      ))}
    </div>
  );
}
