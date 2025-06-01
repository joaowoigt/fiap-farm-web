import { Button } from "@repo/ui/buttons";
import Goal from "../../../domain/models/farm/goals/ProductionGoal";
import { Text } from "@repo/ui/texts";
import { useState } from "react";
import {
  Dropdown,
  DropDownItem,
  GoalType,
  menuGoalTypeDropDownItems,
  menuTypeDropDownItems,
  ProductionType,
} from "@repo/ui/dropdown";
import CurrencyInput from "react-currency-input-field";

interface NewGoalsProps {
  onAddGoal: (goal: Goal) => void;
}

export default function NewGoals({ onAddGoal }: NewGoalsProps) {
  const [type, setType] = useState(ProductionType.crops);
  const [goalType, setGoalType] = useState(GoalType.production);
  const [quantity, setQuantity] = useState<number>(0);
  const [goalValue, setGoalValue] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <div className="flex flex-col border-2 h-fit border-background rounded-lg mx-3 p-3">
      <Text
        intent="Heading"
        color="default"
        style="bold"
        text="New Goal"
      ></Text>
      <Text
        intent="Small"
        color="default"
        text="Add a new production goal for the farm."
      ></Text>
      <div className="mt-4">
        <Dropdown
          placeholder="Select the product type"
          onSelect={(item: DropDownItem) =>
            setType(item.type as ProductionType)
          }
          menuItems={menuTypeDropDownItems}
        />
      </div>
      <div className="mt-4">
        <Dropdown
          placeholder="Select the product type"
          onSelect={(item: DropDownItem) => setGoalType(item.type as GoalType)}
          menuItems={menuGoalTypeDropDownItems}
        />
      </div>
      {goalType === GoalType.production && (
        <div className="mt-4">
          <input
            className="outline outline-1 outline-primary mb-6 bg-white rounded-md px-3 w-full  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="number"
            name="quantity"
            placeholder="Enter the quantity goal"
            onChange={(event: any) => setQuantity(event.target.value)}
            color="default"
            value={quantity !== 0 ? quantity : ""}
          ></input>
        </div>
      )}

      {goalType === GoalType.sales && (
        <div className="mt-4">
          <CurrencyInput
            placeholder="Enter the goal value"
            decimalsLimit={2}
            onValueChange={(value, name, values) =>
              setGoalValue(values?.float as number)
            }
            value={goalValue !== 0 ? goalValue : ""}
            prefix="R$"
            className="outline outline-1 outline-primary  mb-6 mt-medium bg-white rounded-md px-3  py-3 text-black text-start flex flex-row hover:cursor-text"
          />
        </div>
      )}
      <div className="mt-3 flex justify-end">
        <Text
          intent="Small"
          color="default"
          text={success ? "Sale added successfully!" : ""}
        ></Text>
        <Button intent="secondary" onClick={onAddGoal} text="Add Sale"></Button>
      </div>
    </div>
  );
}
