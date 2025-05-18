import { AuthRepository } from "../../../domain/repositories/auth-repository";
import {
  signInWithEmailAndPassword,
  Auth,
  User as FirebaseAuthUser,
} from "firebase/auth";
import { auth as firebaseAuthInstance } from "../clientApp";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { User } from "../../../domain/models/user";

function mapFirebaseUserToDomainUser(firebaseUser: FirebaseAuthUser): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
  };
}

export class FirebaseAuthRepository implements AuthRepository {
  private auth: Auth;

  constructor(authInstance: Auth) {
    this.auth = authInstance;
  }
  async registerUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential["user"]> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuthInstance,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (userCredential.user) {
        return mapFirebaseUserToDomainUser(userCredential.user);
      }
      return null;
    } catch (error) {
      console.error("Erro ao fazer login", error);
      throw new Error(`Erro ao fazer login: ${error}`);
    }
  }
}

export const firebaseAuthRepository = new FirebaseAuthRepository(
  firebaseAuthInstance
);
