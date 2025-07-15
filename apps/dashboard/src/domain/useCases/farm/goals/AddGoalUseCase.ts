import { GoalType } from "../../../models/farm/goals/GoalType";
import Goal from "../../../models/farm/goals/Goal";
import { Result } from "../../../common/Result";

export interface AddGoalUseCase {
  execute: (
    userId: string,
    newGoal: Goal,
    type: GoalType
  ) => Promise<Result<boolean>>;
}
