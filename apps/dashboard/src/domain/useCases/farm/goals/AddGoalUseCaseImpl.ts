import { GoalType } from "../../../models/farm/goals/GoalType";
import { firebaseGoalsRepository } from "../../../../data/firebase/goals/firebase-goals-repository";
import Goal from "../../../models/farm/goals/Goal";
import { GoalsRepository } from "../../../repositories/goals-repository";
import { AddGoalUseCase } from "./AddGoalUseCase";
import { Result, ValidationError, Failure } from "../../../common/Result";

export class AddGoalUseCaseImpl implements AddGoalUseCase {
  constructor(private goalsRepository: GoalsRepository) {}
  async execute(
    userId: string,
    newGoal: Goal,
    type: GoalType
  ): Promise<Result<boolean>> {
    if (!userId) {
      return Failure.create(new ValidationError("ID do usuário é obrigatório"));
    }
    if (!newGoal) {
      return Failure.create(
        new ValidationError("Dados da meta são obrigatórios")
      );
    }

    return this.goalsRepository.addGoalToUser(userId, newGoal, type);
  }
}

export const addGoalUseCaseImpl = new AddGoalUseCaseImpl(
  firebaseGoalsRepository
);
