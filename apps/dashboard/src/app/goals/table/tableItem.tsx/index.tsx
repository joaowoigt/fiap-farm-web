import StatusTag from "@repo/ui/statusTag";
import Goal from "../../../../domain/models/farm/goals/ProductionGoal";
import { Text } from "@repo/ui/texts";

export interface GoalsItemTableProps {
  goal: Goal;
  type: string;
}

export function GoalsItemTable({ goal, type }: GoalsItemTableProps) {
  let formattedGoal = formatText(goal.goal.toString(), type);
  let formatedCurrent = formatText(goal.current.toString(), type);
  return (
    <div className="grid grid-cols-3 justify-between p-3">
      <StatusTag status={goal.type.toString()}></StatusTag>
      <Text intent="Small" color="default" text={formattedGoal}></Text>
      <Text intent="Small" color="default" text={formatedCurrent}></Text>
    </div>
  );
}

function formatText(text: string, type: string): string {
  if (type === "production") {
    return text;
  } else {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(text));
  }
}
