import { Text } from "@repo/ui/texts";
import Goals from "../../domain/models/farm/goals/Goals";
import GoalsTable from "./table";

interface GoalsDashboardProps {
  goals: Goals;
  //   onAddGoal: (newGoal: Goals) => Promise<boolean>;
}

export default function GoalsDashboard({
  goals,
  //   onAddGoal,
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
        {/* New Goal form would go here */}
      </div>
    </div>
  );
}
