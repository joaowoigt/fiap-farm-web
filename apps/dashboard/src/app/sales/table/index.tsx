import { Text } from "@repo/ui/texts";
import SalesItem from "../../../domain/models/farm/sales/SalesItem";
import { SalesItemTable } from "./tableItem";

export interface SalesTableProps {
  sales: SalesItem[];
}
export default function SalesTable({ sales }: SalesTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3 bg-background p-3 rounded-md border-2">
        <Text intent="Regular" color="default" style="bold" text="Name"></Text>
        <Text intent="Regular" color="default" style="bold" text="Type"></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Income"
        ></Text>
      </div>
      {sales.length === 0 && (
        <div className="p-3">
          <Text
            intent="Small"
            color="default"
            text="No Sales found. Add your first item to keep track of your farm's sales."
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
