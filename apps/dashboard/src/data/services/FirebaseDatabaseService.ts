/**
 * Implementação do Firebase para DatabaseService
 * Implementa a abstração para manter o desacoplamento
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Firestore,
} from "@firebase/firestore";
import {
  DatabaseService,
  DatabaseDocumentSnapshot,
} from "../../domain/services/DatabaseService";
import {
  Result,
  Success,
  Failure,
  DatabaseError,
  NotFoundError,
} from "../../domain/common/Result";

export class FirebaseDatabaseService implements DatabaseService {
  private db: Firestore;

  constructor(private firestore: Firestore) {
    this.db = firestore;
  }

  async getDocument<T>(
    collection: string,
    documentId: string
  ): Promise<Result<T>> {
    try {
      const docRef = doc(this.firestore, collection, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return Success.create(docSnap.data() as T);
      } else {
        return Failure.create(
          new NotFoundError(`Documento ${documentId} na coleção ${collection}`)
        );
      }
    } catch (error) {
      console.error("Erro ao buscar documento:", error);
      return Failure.create(new DatabaseError("Falha ao buscar documento"));
    }
  }

  async setDocument<T>(
    collection: string,
    documentId: string,
    data: T,
    merge: boolean = false
  ): Promise<Result<void>> {
    try {
      const docRef = doc(this.firestore, collection, documentId);
      await setDoc(docRef, data, { merge });
      return Success.create(undefined);
    } catch (error) {
      console.error("Erro ao salvar documento:", error);
      return Failure.create(new DatabaseError("Falha ao salvar documento"));
    }
  }

  async updateDocument<T>(
    collection: string,
    documentId: string,
    data: Partial<T>
  ): Promise<Result<void>> {
    try {
      const docRef = doc(this.firestore, collection, documentId);
      await updateDoc(docRef, data);
      return Success.create(undefined);
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
      return Failure.create(new DatabaseError("Falha ao atualizar documento"));
    }
  }

  async deleteDocument(
    collection: string,
    documentId: string
  ): Promise<Result<void>> {
    try {
      const docRef = doc(this.firestore, collection, documentId);
      await deleteDoc(docRef);
      return Success.create(undefined);
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
      return Failure.create(new DatabaseError("Falha ao deletar documento"));
    }
  }

  async documentExists(
    collection: string,
    documentId: string
  ): Promise<Result<boolean>> {
    try {
      const docRef = doc(this.firestore, collection, documentId);
      const docSnap = await getDoc(docRef);
      return Success.create(docSnap.exists());
    } catch (error) {
      console.error("Erro ao verificar existência do documento:", error);
      return Failure.create(new DatabaseError("Falha ao verificar documento"));
    }
  }
}
