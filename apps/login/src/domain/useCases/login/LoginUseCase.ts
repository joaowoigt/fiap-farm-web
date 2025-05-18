import { UiError } from "../../models/Error";
import { User } from "../../models/user";

export interface LoginUseCase {
  execute: (email: string, password: string) => Promise<LoginResult>;
}

export interface LoginSuccess {
  user: User;
}

export type LoginResult = LoginSuccess | UiError;
