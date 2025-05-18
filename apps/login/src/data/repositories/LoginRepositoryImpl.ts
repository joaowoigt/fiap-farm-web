import http from "../http";
import { LoginRepository } from "./LoginRepository";
import { encrypt } from "../security/EncryptUtils";

export class LoginRepositoryImpl implements LoginRepository {
  async login(email: string, password: string): Promise<string> {
    const response = await http.post("/user/auth", { email, password });
    let encryptToken = encrypt(response.data.result.token);
    return encryptToken.encryptedData;
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<boolean> {
    const response = await http.post("/user", { username, email, password });
    return response.status === 201;
  }
}
