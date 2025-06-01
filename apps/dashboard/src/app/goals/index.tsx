import { Text } from "@repo/ui/texts";
import Goals from "../../domain/models/farm/goals/Goals";
import GoalsTable from "./table";
import Goal from "../../domain/models/farm/goals/ProductionGoal";
import NewGoals from "./newGoal";

interface GoalsDashboardProps {
  goals: Goals;
  onAddGoal: (newGoal: Goal, goalType: string) => Promise<boolean>;
}

export default function GoalsDashboard({
  goals,
  onAddGoal,
}: GoalsDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Goals Dashboard"
      ></Text>
      <div className="flex flex-row">
        <GoalsTable
          salesGoals={goals.salesGoals}
          productionGoals={goals.productionGoals}
        />
        <NewGoals onAddGoal={onAddGoal}></NewGoals>
      </div>
    </div>
  );
}
