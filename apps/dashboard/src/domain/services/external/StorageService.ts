/**
 * Interface for external storage service
 * Abstracts Firebase or any other storage implementation
 */
export interface StorageService {
  /**
   * Stores data for a specific user and collection
   */
  store<T>(userId: string, collection: string, data: T): Promise<string>;

  /**
   * Retrieves data for a specific user and collection
   */
  retrieve<T>(userId: string, collection: string): Promise<T[]>;

  /**
   * Updates specific data by ID
   */
  update<T>(
    userId: string,
    collection: string,
    id: string,
    data: Partial<T>
  ): Promise<void>;

  /**
   * Deletes specific data by ID
   */
  delete(userId: string, collection: string, id: string): Promise<void>;

  /**
   * Performs a query with filters
   */
  query<T>(
    userId: string,
    collection: string,
    filters: QueryFilter[]
  ): Promise<T[]>;
}

export interface QueryFilter {
  field: string;
  operator: "==" | "!=" | "<" | "<=" | ">" | ">=" | "in" | "array-contains";
  value: any;
}

/**
 * Interface for authentication service
 */
export interface AuthenticationStorageService {
  /**
   * Authenticates user with email and password
   */
  signIn(email: string, password: string): Promise<AuthResult>;

  /**
   * Registers a new user
   */
  signUp(email: string, password: string, userData: any): Promise<AuthResult>;

  /**
   * Signs out current user
   */
  signOut(): Promise<void>;

  /**
   * Gets current authenticated user
   */
  getCurrentUser(): Promise<AuthenticatedUser | null>;
}

export interface AuthResult {
  success: boolean;
  user?: AuthenticatedUser;
  error?: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  displayName?: string;
}
