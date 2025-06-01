import { GoalType } from "@repo/ui/dropdown";
import Goal from "../models/farm/goals/Goal";

export interface GoalsRepository {
  addGoalToUser(
    userId: string,
    newGoal: Goal,
    goalType: GoalType
  ): Promise<boolean>;
}
