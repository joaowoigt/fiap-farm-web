import { GoalType } from "@repo/ui/dropdown";
import Goal from "../../../models/farm/goals/Goal";
import { Result } from "../../../common/Result";

export interface AddGoalUseCase {
  execute: (
    userId: string,
    newGoal: Goal,
    type: GoalType
  ) => Promise<Result<boolean>>;
}
