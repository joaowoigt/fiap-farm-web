import { firebaseGoalsRepository } from "../../../../data/firebase/goals/firebase-goals-repository";
import Goal from "../../../models/farm/goals/ProductionGoal";
import { GoalsRepository } from "../../../repositories/goals-repository";
import { AddGoalUseCase } from "./AddGoalUseCase";

export class AddGoalUseCaseImpl implements AddGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute(userId: string, newGoal: Goal, type: string): Promise<boolean> {
    if (!userId || !newGoal) {
      throw new Error("User ID and goal must be provided");
    }

    return this.goalsRepository.addGoalToUser(userId, newGoal, type);
  }
}

export const addGoalUseCaseImpl = new AddGoalUseCaseImpl(
  firebaseGoalsRepository
);
