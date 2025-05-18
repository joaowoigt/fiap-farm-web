import { User as FirebaseAuthUser } from "firebase/auth";
import { User } from "../../domain/models/user";

export function mapFirebaseUserToDomainUser(
  firebaseUser: FirebaseAuthUser
): User {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email,
  };
}
