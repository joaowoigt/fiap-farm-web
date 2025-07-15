import { AuthRepository } from "../../repositories/auth-repository";
import { RegisterUseCase } from "./RegisterUseCase";
import { firebaseAuthRepository } from "../../../data/firebase/Auth/firebase-auth-repository";
import { Result, Failure, ValidationError } from "../../common/Result";
import { User } from "../../models/user";

export class RegisterUseCaseImpl implements RegisterUseCase {
  constructor(private authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }
  async execute(email: string, password: string): Promise<Result<User>> {
    // Validate input - check for empty or whitespace-only strings
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return Failure.create(
        new ValidationError("Email e senha são obrigatórios"),
      );
    }

    return await this.authRepository.registerUserWithEmailAndPassword(
      email,
      password,
    );
  }
}

export const registerUseCaseImpl = new RegisterUseCaseImpl(
  firebaseAuthRepository,
);
