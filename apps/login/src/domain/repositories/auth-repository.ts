import { User } from "../models/user";

export interface AuthRepository {
  registerUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
  loginWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<User | null>;
}
