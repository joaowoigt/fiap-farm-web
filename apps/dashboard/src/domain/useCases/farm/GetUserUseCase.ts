import User from "../../models/farm/user/User";

export interface GetUserUseCase {
  execute: (uid: string) => Promise<User | null>;
}
