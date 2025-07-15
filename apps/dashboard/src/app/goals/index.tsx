import { Text } from "@repo/ui/texts";
import Goals from "../../domain/models/farm/goals/Goals";
import GoalsTable from "./table";
import Goal from "../../domain/models/farm/goals/Goal";
import NewGoals from "./newGoal";
import { GoalType } from "@repo/ui/dropdown";

interface GoalsDashboardProps {
  goals: Goals;
  onAddGoal: (newGoal: Goal, goalType: GoalType) => Promise<boolean>;
  loading: boolean;
}

export default function GoalsDashboard({
  goals,
  onAddGoal,
  loading,
}: GoalsDashboardProps) {
  return (
    <div className="flex flex-col">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="Dashboard de Metas"
      ></Text>
      <div className="flex flex-row">
        <GoalsTable
          salesGoals={goals.salesGoals}
          productionGoals={goals.productionGoals}
          loading={loading}
        />
        <NewGoals onAddGoal={onAddGoal}></NewGoals>
      </div>
    </div>
  );
}
