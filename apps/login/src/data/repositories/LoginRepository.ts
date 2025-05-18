export interface LoginRepository {
  login: (email: string, password: string) => Promise<string>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
}
