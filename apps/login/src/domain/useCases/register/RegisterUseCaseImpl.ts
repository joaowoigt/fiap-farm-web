import { AuthRepository } from "../../repositories/auth-repository";
import { RegisterUseCase } from "./RegisterUseCase";
import { firebaseAuthRepository } from "../../../data/firebase/Auth/firebase-auth-repository";
import {
  Result,
  Success,
  Failure,
  ValidationError,
  DomainError,
} from "../../common/Result";
import { User } from "../../models/user";
import { AuthenticationService } from "../../services/AuthenticationService";

export class RegisterUseCaseImpl implements RegisterUseCase {
  private authService: AuthenticationService;

  constructor(private authRepository: AuthRepository) {
    this.authRepository = authRepository;
    this.authService = new AuthenticationService();
  }

  async execute(
    email: string,
    password: string
  ): Promise<Result<User, DomainError>> {
    // Validação usando AuthenticationService
    const validationResult = this.authService.validateRegistrationData(
      email,
      password
    );
    if (validationResult.isFailure) {
      return validationResult as Result<User, DomainError>;
    }

    // Registrar usuário no Firebase
    const userResult =
      await this.authRepository.registerUserWithEmailAndPassword(
        email,
        password
      );

    return userResult;
  }
}

export const registerUseCaseImpl = new RegisterUseCaseImpl(
  firebaseAuthRepository
);
