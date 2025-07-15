import { GoalType } from "../models/farm/goals/GoalType";
import Goal from "../models/farm/goals/Goal";
import { Result } from "../common/Result";

export interface GoalsRepository {
  addGoalToUser(
    userId: string,
    newGoal: Goal,
    goalType: GoalType
  ): Promise<Result<boolean>>;
}
