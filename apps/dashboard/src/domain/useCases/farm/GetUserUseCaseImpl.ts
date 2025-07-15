import { firebaseUserRepository } from "../../../data/firebase/user/firebase-user-repository";
import SalesItem from "../../models/farm/sales/SalesItem";
import User from "../../models/farm/user/User";
import { UserRepository } from "../../repositories/user-repository";
import { GetUserUseCase } from "./GetUserUseCase";
import { Result } from "../../common/Result";

export class GetUserUseCaseImpl implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(uid: string): Promise<Result<User | null>> {
    const userResult = await this.userRepository.getUserByUid(uid);

    return userResult.map((user) => {
      if (user && user.sales) {
        user.sales = user.sales.sort((a: SalesItem, b: SalesItem) => {
          return b.income - a.income;
        });
      }
      return user;
    });
  }
}

export const getUserUseCaseImpl = new GetUserUseCaseImpl(
  firebaseUserRepository,
);
