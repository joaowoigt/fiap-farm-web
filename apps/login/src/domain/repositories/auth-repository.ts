import { User } from "../models/user";
import { Result, DomainError } from "../common/Result";

export interface AuthRepository {
  registerUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Result<User, DomainError>>;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Result<User, DomainError>>;
}
