import Goal from "../../../models/farm/goals/ProductionGoal";

export interface AddGoalUseCase {
  execute: (userId: string, newGoal: Goal, type: string) => Promise<boolean>;
}
