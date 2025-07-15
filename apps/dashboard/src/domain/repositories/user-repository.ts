import User from "../models/farm/user/User";
import { Result } from "../common/Result";

export interface UserRepository {
  getUserByUid(uid: string): Promise<Result<User>>;
}
