import { GoalType } from "@repo/ui/dropdown";
import { firebaseGoalsRepository } from "../../../../data/firebase/goals/firebase-goals-repository";
import Goal from "../../../models/farm/goals/Goal";
import { GoalsRepository } from "../../../repositories/goals-repository";
import { AddGoalUseCase } from "./AddGoalUseCase";
import { Result, Failure, ValidationError } from "../../../common/Result";

export class AddGoalUseCaseImpl implements AddGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}

  async execute(
    userId: string,
    newGoal: Goal,
    type: GoalType
  ): Promise<Result<boolean>> {
    if (!userId || !newGoal) {
      return Failure.create(
        new ValidationError("User ID e meta são obrigatórios")
      );
    }

    return this.goalsRepository.addGoalToUser(userId, newGoal, type);
  }
}

export const addGoalUseCaseImpl = new AddGoalUseCaseImpl(
  firebaseGoalsRepository
);
