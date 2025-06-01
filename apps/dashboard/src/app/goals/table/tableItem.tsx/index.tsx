import StatusTag from "@repo/ui/statusTag";
import Goal from "../../../../domain/models/farm/goals/ProductionGoal";
import { Text } from "@repo/ui/texts";

export interface GoalsItemTableProps {
  goal: Goal;
}

export function GoalsItemTable({ goal }: GoalsItemTableProps) {
  return (
    <div className="grid grid-cols-3 justify-between p-3">
      <StatusTag status={goal.type.toString()}></StatusTag>
      <Text intent="Small" color="default" text={goal.goal.toString()}></Text>
      <Text
        intent="Small"
        color="default"
        text={goal.current.toString()}
      ></Text>
    </div>
  );
}
