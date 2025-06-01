import { GoalType } from "@repo/ui/dropdown";
import Goal from "../../../models/farm/goals/Goal";

export interface AddGoalUseCase {
  execute: (userId: string, newGoal: Goal, type: GoalType) => Promise<boolean>;
}
