import { firebaseUserRepository } from "../../../data/firebase/user/firebase-user-repository";
import SalesItem from "../../models/farm/sales/SalesItem";
import User from "../../models/farm/user/User";
import { UserRepository } from "../../repositories/user-repository";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserUseCaseImpl implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(uid: string): Promise<User | null> {
    const user = await this.userRepository.getUserByUid(uid);
    user.sales = user.sales.sort((a: SalesItem, b: SalesItem) => {
      return b.income - a.income;
    });

    return user;
  }
}

export const getUserUseCaseImpl = new GetUserUseCaseImpl(
  firebaseUserRepository
);
