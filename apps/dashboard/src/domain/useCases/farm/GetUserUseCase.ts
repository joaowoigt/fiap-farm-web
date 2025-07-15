import User from "../../models/farm/user/User";
import { Result } from "../../common/Result";

export interface GetUserUseCase {
  execute: (uid: string) => Promise<Result<User>>;
}
