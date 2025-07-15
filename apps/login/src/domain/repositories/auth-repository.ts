import { User } from "../models/user";
import { Result } from "../common/Result";

export interface AuthRepository {
  registerUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Result<User>>;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<Result<User>>;
}
