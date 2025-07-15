import { Result, DomainError } from "../../common/Result";
import { User } from "../../models/user";

export interface RegisterUseCase {
  execute: (
    email: string,
    password: string
  ) => Promise<Result<User, DomainError>>;
}
