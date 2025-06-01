import { Text } from "@repo/ui/texts";
import Goal from "../../../domain/models/farm/goals/ProductionGoal";
import { GoalsItemTable } from "./tableItem.tsx";

interface GoalsTableProps {
  productionGoals: Goal[];
  salesGoals: Goal[];
}

export default function GoalsTable({
  salesGoals,
  productionGoals,
}: GoalsTableProps) {
  return (
    <div className="border-2 w-[70%] h-fit border-background rounded-lg">
      <div className="grid grid-cols-3 bg-background p-3 rounded-md border-2">
        <Text intent="Regular" color="default" style="bold" text="Type"></Text>
        <Text intent="Regular" color="default" style="bold" text="Goal"></Text>
        <Text
          intent="Regular"
          color="default"
          style="bold"
          text="Current"
        ></Text>
      </div>
      <div className="p-3">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Production Goals"
        ></Text>
        {productionGoals.length === 0 ? (
          <div className="p-3">
            <Text
              intent="Small"
              color="default"
              text="No Sales found. Add your first item to keep track of your farm's sales."
            />
          </div>
        ) : (
          productionGoals.map((goal, index) => (
            <div key={index}>
              <GoalsItemTable goal={goal} />
            </div>
          ))
        )}
      </div>
      <div className="w-full h-0.5 bg-primary-light" />
      <div className="p-3">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Sales Goals"
        ></Text>
        {salesGoals.length === 0 ? (
          <div className="p-3">
            <Text
              intent="Small"
              color="default"
              text="No Sales found. Add your first item to keep track of your farm's sales."
            />
          </div>
        ) : (
          salesGoals.map((goal, index) => (
            <div key={index}>
              <GoalsItemTable goal={goal} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
