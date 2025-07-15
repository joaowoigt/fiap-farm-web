import { AuthRepository } from "../../../domain/repositories/auth-repository";
import { signInWithEmailAndPassword, Auth } from "firebase/auth";
import { auth as firebaseAuthInstance } from "../clientApp";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { User } from "../../../domain/models/user";
import { mapFirebaseUserToDomainUser } from "../../mappers";
import {
  Result,
  Success,
  Failure,
  AuthenticationError,
  NetworkError,
  DomainError,
} from "../../../domain/common/Result";

export class FirebaseAuthRepository implements AuthRepository {
  private auth: Auth;

  constructor(authInstance: Auth) {
    this.auth = authInstance;
  }
  async registerUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Result<User, DomainError>> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuthInstance,
        email,
        password
      );
      const domainUser = mapFirebaseUserToDomainUser(userCredential.user);
      return Success.create(domainUser);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        return Failure.create(new AuthenticationError("Email já está em uso"));
      }
      if (error.code === "auth/weak-password") {
        return Failure.create(new AuthenticationError("Senha muito fraca"));
      }
      if (error.code === "auth/invalid-email") {
        return Failure.create(new AuthenticationError("Email inválido"));
      }
      return Failure.create(new NetworkError("Erro de conexão com o servidor"));
    }
  }
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Result<User, DomainError>> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (userCredential.user) {
        const domainUser = mapFirebaseUserToDomainUser(userCredential.user);
        return Success.create(domainUser);
      }
      return Failure.create(new AuthenticationError("Falha na autenticação"));
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        return Failure.create(
          new AuthenticationError("Usuário não encontrado")
        );
      }
      if (error.code === "auth/wrong-password") {
        return Failure.create(new AuthenticationError("Senha incorreta"));
      }
      if (error.code === "auth/invalid-email") {
        return Failure.create(new AuthenticationError("Email inválido"));
      }
      return Failure.create(new NetworkError("Erro de conexão com o servidor"));
    }
  }
}

export const firebaseAuthRepository = new FirebaseAuthRepository(
  firebaseAuthInstance
);
