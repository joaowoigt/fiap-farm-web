import { firebaseUserRepository } from "../../../data/firebase/user/firebase-user-repository";
import { UserRepository } from "../../repositories/user-repository";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserUseCaseImpl implements GetUserUseCase {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(uid: string): Promise<void> {
    this.userRepository.getUserByUid(uid);
  }
}

export const getUserUseCaseImpl = new GetUserUseCaseImpl(
  firebaseUserRepository
);
