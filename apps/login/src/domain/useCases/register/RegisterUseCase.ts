import { User } from "../../models/user";
import { Result } from "../../common/Result";

export interface RegisterUseCase {
  execute: (email: string, password: string) => Promise<Result<User>>;
}
