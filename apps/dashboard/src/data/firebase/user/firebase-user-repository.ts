import { doc, Firestore, getDoc, setDoc } from "@firebase/firestore";
import User from "../../../domain/models/farm/user/User";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../clientApp";
import { mapUser } from "../../../domain/mappers/farm/UserMapper";
import UserResponse from "../../responses/farm/user/UserResponse";
import {
  Result,
  Success,
  Failure,
  DatabaseError,
  ValidationError,
} from "../../../domain/common/Result";

export class FirebaseUserRepository implements UserRepository {
  private auth: Auth;
  private db: Firestore;

  constructor(authOrDb: Auth | Firestore, db?: Firestore) {
    if (db) {
      // Constructor com Auth e Firestore (formato antigo)
      this.auth = authOrDb as Auth;
      this.db = db;
    } else {
      // Constructor apenas com Firestore (para DIContainer)
      this.auth = auth;
      this.db = authOrDb as Firestore;
    }
  }

  async getUserByUid(uid: string): Promise<Result<User>> {
    if (!uid) {
      return Failure.create(new ValidationError("User ID é obrigatório"));
    }

    try {
      console.log("getUserByUid", uid);
      const userDocRef = doc(this.db, "users", uid);
      console.log("userDocRef", userDocRef);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        console.log("docSnap", docSnap.data());
        const userData = docSnap.data() as UserResponse;
        const mappedUser = mapUser(userData);
        console.log("mappedUser", mappedUser);
        return Success.create(mappedUser);
      } else {
        console.log("No such document!");
        const emptyUser: UserResponse = {
          sales: [],
          production: [],
          goals: {
            productionGoals: [],
            salesGoals: [],
          },
        };
        await setDoc(userDocRef, emptyUser);
        return Success.create(mapUser(emptyUser));
      }
    } catch (error) {
      console.error("Error getting user:", error);
      return Failure.create(
        new DatabaseError(`Erro ao buscar usuário: ${error}`),
      );
    }
  }
}

export const firebaseUserRepository = new FirebaseUserRepository(auth, db);
