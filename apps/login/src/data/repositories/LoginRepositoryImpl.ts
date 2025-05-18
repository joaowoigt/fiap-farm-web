import { LoginRepository } from "./LoginRepository";

export class LoginRepositoryImpl implements LoginRepository {
  async login(email: string, password: string): Promise<string> {
    return "";
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    return true;
  }
}
