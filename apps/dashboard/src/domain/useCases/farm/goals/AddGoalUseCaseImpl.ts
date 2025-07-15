import { GoalType } from "@repo/ui/dropdown";
import { firebaseGoalsRepository } from "../../../../data/firebase/goals/firebase-goals-repository";
import Goal from "../../../models/farm/goals/Goal";
import { GoalsRepository } from "../../../repositories/goals-repository";
import { AddGoalUseCase } from "./AddGoalUseCase";

export class AddGoalUseCaseImpl implements AddGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute(
    userId: string,
    newGoal: Goal,
    type: GoalType
  ): Promise<boolean> {
    if (!userId || !newGoal) {
      throw new Error("User ID and goal must be provided");
    }

    return this.goalsRepository.addGoalToUser(userId, newGoal, type);
  }
}

export const addGoalUseCaseImpl = new AddGoalUseCaseImpl(
  firebaseGoalsRepository
);
