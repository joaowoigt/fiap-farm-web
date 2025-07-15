import { doc, Firestore, getDoc, setDoc } from "@firebase/firestore";
import User from "../../../domain/models/farm/user/User";
import { UserRepository } from "../../../domain/repositories/user-repository";
import { Auth, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../clientApp";
import { mapUser } from "../../../domain/mappers/farm/UserMapper";
import UserResponse from "../../responses/farm/user/UserResponse";

export class FirebaseUserRepository implements UserRepository {
  private auth: Auth;
  private db: Firestore;

  constructor(auth: Auth, db: Firestore) {
    this.auth = auth;
    this.db = db;
  }

  async getUserByUid(uid: string): Promise<User> {
    console.log("getUserByUid", uid);
    const userDocRef = doc(this.db, "users", uid);
    console.log("userDocRef", userDocRef);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      console.log("docSnap", docSnap.data());
      const userData = docSnap.data() as UserResponse;
      const mappedUser = mapUser(userData);
      console.log("mappedUser", mappedUser);
      return mappedUser;
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
      setDoc(userDocRef, emptyUser);
      return mapUser(emptyUser);
    }
  }
}

export const firebaseUserRepository = new FirebaseUserRepository(auth, db);
