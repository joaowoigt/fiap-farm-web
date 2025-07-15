import { firebaseUserRepository } from "../../../data/firebase/user/firebase-user-repository";
import SalesItem from "../../models/farm/sales/SalesItem";
import User from "../../models/farm/user/User";
import { UserRepository } from "../../repositories/user-repository";
import { GetUserUseCase } from "./GetUserUseCase";
import { Result, Success, Failure, ValidationError } from "../../common/Result";

export class GetUserUseCaseImpl implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async execute(uid: string): Promise<Result<User>> {
    if (!uid) {
      return Failure.create(new ValidationError("ID do usuário é obrigatório"));
    }

    const userResult = await this.userRepository.getUserByUid(uid);

    if (userResult.isFailure) {
      return userResult;
    }

    const user = userResult.value;
    user.sales = user.sales.sort((a: SalesItem, b: SalesItem) => {
      return b.income - a.income;
    });

    return Success.create(user);
  }
}

export const getUserUseCaseImpl = new GetUserUseCaseImpl(
  firebaseUserRepository
);
