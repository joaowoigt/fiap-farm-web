import Goal from "../models/farm/goals/ProductionGoal";

export interface GoalsRepository {
  addGoalToUser(
    userId: string,
    newGoal: Goal,
    goalType: string
  ): Promise<boolean>;
}
