import { Result } from "../common/Result";

// Interface para abstrair serviços de banco de dados
export interface DatabaseService {
  getDocument<T>(collection: string, id: string): Promise<Result<T>>;
  setDocument<T>(
    collection: string,
    id: string,
    data: T,
  ): Promise<Result<void>>;
  updateDocument<T>(
    collection: string,
    id: string,
    data: Partial<T>,
  ): Promise<Result<void>>;
  deleteDocument(collection: string, id: string): Promise<Result<void>>;
}
