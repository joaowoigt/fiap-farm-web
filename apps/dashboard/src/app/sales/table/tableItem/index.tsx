import { Text } from "@repo/ui/texts";
import SalesItem from "../../../../domain/models/farm/sales/SalesItem";
import StatusTag from "@repo/ui/statusTag";

export interface SalesItemTableProps {
  sales: SalesItem;
}

export function SalesItemTable({ sales }: SalesItemTableProps) {
  return (
    <div className="grid grid-cols-3 justify-between p-3">
      <Text intent="Small" color="default" text={sales.product.name}></Text>
      <StatusTag status={sales.product.type.toString()}></StatusTag>
    </div>
  );
}
