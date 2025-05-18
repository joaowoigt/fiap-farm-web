export interface AuthRepository {
  registerUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<any>;
}
