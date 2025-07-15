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
  ValidationError,
  AuthenticationError,
  NetworkError,
} from "../../../domain/common/Result";

export class FirebaseAuthRepository implements AuthRepository {
  private auth: Auth;

  constructor(authInstance: Auth) {
    this.auth = authInstance;
  }

  async registerUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Result<User>> {
    if (!email || !password) {
      return Failure.create(
        new ValidationError("Email e senha são obrigatórios"),
      );
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuthInstance,
        email,
        password,
      );
      const domainUser = mapFirebaseUserToDomainUser(userCredential.user);
      return Success.create(domainUser);
    } catch (error: any) {
      console.error("Erro ao registrar usuário", error);
      if (error.code === "auth/email-already-in-use") {
        return Failure.create(new ValidationError("Email já está em uso"));
      } else if (error.code === "auth/weak-password") {
        return Failure.create(new ValidationError("Senha muito fraca"));
      } else if (error.code === "auth/invalid-email") {
        return Failure.create(new ValidationError("Email inválido"));
      }
      return Failure.create(
        new NetworkError(`Erro ao registrar usuário: ${error.message}`),
      );
    }
  }

  async loginWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<Result<User>> {
    if (!email || !password) {
      return Failure.create(
        new ValidationError("Email e senha são obrigatórios"),
      );
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password,
      );
      if (userCredential.user) {
        const domainUser = mapFirebaseUserToDomainUser(userCredential.user);
        return Success.create(domainUser);
      } else {
        return Failure.create(new AuthenticationError("Falha na autenticação"));
      }
    } catch (error: any) {
      console.error("Erro ao fazer login", error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        return Failure.create(
          new AuthenticationError("Email ou senha inválidos"),
        );
      } else if (error.code === "auth/invalid-email") {
        return Failure.create(new ValidationError("Email inválido"));
      }
      return Failure.create(
        new NetworkError(`Erro ao fazer login: ${error.message}`),
      );
    }
  }
}

export const firebaseAuthRepository = new FirebaseAuthRepository(
  firebaseAuthInstance,
);
