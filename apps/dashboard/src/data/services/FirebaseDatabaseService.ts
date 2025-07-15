import {
  Firestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { DatabaseService } from "../../domain/services/DatabaseService";
import {
  Result,
  Success,
  Failure,
  DatabaseError,
  NotFoundError,
} from "../../domain/common/Result";

export class FirebaseDatabaseService implements DatabaseService {
  constructor(private db: Firestore) {}

  async getDocument<T>(collection: string, id: string): Promise<Result<T>> {
    try {
      const docRef = doc(this.db, collection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return Success.create(docSnap.data() as T);
      } else {
        return Failure.create(
          new NotFoundError(`Document not found in ${collection}/${id}`)
        );
      }
    } catch (error) {
      return Failure.create(
        new DatabaseError(`Failed to get document: ${error}`)
      );
    }
  }

  async setDocument<T>(
    collection: string,
    id: string,
    data: T
  ): Promise<Result<void>> {
    try {
      const docRef = doc(this.db, collection, id);
      await setDoc(docRef, data);
      return Success.create(undefined);
    } catch (error) {
      return Failure.create(
        new DatabaseError(`Failed to set document: ${error}`)
      );
    }
  }

  async updateDocument<T>(
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<Result<void>> {
    try {
      const docRef = doc(this.db, collection, id);
      await updateDoc(docRef, data);
      return Success.create(undefined);
    } catch (error) {
      return Failure.create(
        new DatabaseError(`Failed to update document: ${error}`)
      );
    }
  }

  async deleteDocument(collection: string, id: string): Promise<Result<void>> {
    try {
      const docRef = doc(this.db, collection, id);
      await deleteDoc(docRef);
      return Success.create(undefined);
    } catch (error) {
      return Failure.create(
        new DatabaseError(`Failed to delete document: ${error}`)
      );
    }
  }
}
