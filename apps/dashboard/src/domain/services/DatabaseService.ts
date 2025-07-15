/**
 * Abstração para serviços de banco de dados
 * Segue o princípio de Inversão de Dependência (DIP)
 */

import { Result } from "../common/Result";

export interface DatabaseService {
  getDocument<T>(collection: string, documentId: string): Promise<Result<T>>;
  setDocument<T>(
    collection: string,
    documentId: string,
    data: T,
    merge?: boolean
  ): Promise<Result<void>>;
  updateDocument<T>(
    collection: string,
    documentId: string,
    data: Partial<T>
  ): Promise<Result<void>>;
  deleteDocument(collection: string, documentId: string): Promise<Result<void>>;
  documentExists(
    collection: string,
    documentId: string
  ): Promise<Result<boolean>>;
}

export interface DatabaseDocumentSnapshot<T> {
  exists: boolean;
  data: T | null;
}
