import User from "../models/farm/user/User";

export interface UserRepository {
  getUserByUid(uid: string): Promise<User>;
}
