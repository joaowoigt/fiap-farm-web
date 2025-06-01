import SalesItem from "../../../domain/models/farm/sales/SalesItem";
import { SalesRepository } from "../../../domain/repositories/sales-repository";
import { doc, Firestore, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../clientApp";

export class FirebaseSalesRepository implements SalesRepository {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }

  async addSalesToUser(userId: string, salesItem: SalesItem): Promise<boolean> {
    try {
      const userDocRef = doc(this.db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error("User document does not exist");
        return false;
      }

      const userData = userDocSnap.data();
      if (!userData.production) {
        userData.production = [];
      }

      userData.sales.push(salesItem);
      await setDoc(userDocRef, userData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error adding sales item to user:", error);
      return false;
    }
  }
}

export const firebaseSalesRepository = new FirebaseSalesRepository(db);
