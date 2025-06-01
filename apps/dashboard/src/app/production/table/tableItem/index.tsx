import { Text } from "@repo/ui/texts";
import Production from "../../../../domain/models/farm/production/Production";
import StatusTag from "@repo/ui/statusTag";

export interface ProductionItemTableProps {
  production: Production;
}

export default function ProductionItemTable({
  production,
}: ProductionItemTableProps) {
  return (
    <div className="grid grid-cols-3 justify-between p-3">
      <Text
        intent="Small"
        color="default"
        text={production.product.name}
      ></Text>
      <Text
        intent="Small"
        color="default"
        text={production.quantity.toString()}
      ></Text>
      <StatusTag status={production.status.toString()}></StatusTag>
    </div>
  );
}
