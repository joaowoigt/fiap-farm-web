import { AuthRepository } from "../../../domain/repositories/auth-repository";
import { auth } from "../clientApp";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";

export class FirebaseAuthRepository implements AuthRepository {
  async registerUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential["user"]> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }
}
