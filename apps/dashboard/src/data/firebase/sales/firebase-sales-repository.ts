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
      let updatedList: SalesItem[];
      if (
        userData.sales.some(
          (item: SalesItem) => item.product.name === salesItem.product.name
        )
      ) {
        updatedList = userData.sales.map((item: SalesItem) => {
          if (item.product.name === salesItem.product.name) {
            const updatedItem = { ...item };
            updatedItem.quantity += salesItem.quantity;
            updatedItem.income =
              updatedItem.quantity * updatedItem.product.unitValue;
            return updatedItem;
          }
          return item;
        });
      } else {
        updatedList = [...userData.sales, salesItem];
      }
      userData.sales = updatedList;

      const goalsIndex = userData.goals?.salesGoals.findIndex(
        (goal: { type: string }) => goal.type === salesItem.product.type
      );
      if (goalsIndex !== -1) {
        userData.goals.salesGoals[goalsIndex].current += salesItem.income;
      }

      await setDoc(userDocRef, userData, { merge: true });
      return true;
    } catch (error) {
      console.error("Error adding sales item to user:", error);
      return false;
    }
  }
}

export const firebaseSalesRepository = new FirebaseSalesRepository(db);
