// Result Pattern para tratamento de erros funcionais
export abstract class Result<T> {
  abstract isSuccess(): boolean;
  abstract isFailure(): boolean;
  abstract getValue(): T;
  abstract getError(): Error;

  // Métodos funcionais
  map<U>(fn: (value: T) => U): Result<U> {
    if (this.isSuccess()) {
      try {
        return Success.create(fn(this.getValue()));
      } catch (error) {
        return Failure.create(
          error instanceof Error ? error : new Error(String(error))
        );
      }
    }
    return Failure.create(this.getError());
  }

  flatMap<U>(fn: (value: T) => Result<U>): Result<U> {
    if (this.isSuccess()) {
      return fn(this.getValue());
    }
    return Failure.create(this.getError());
  }

  match<U>(onSuccess: (value: T) => U, onFailure: (error: Error) => U): U {
    if (this.isSuccess()) {
      return onSuccess(this.getValue());
    }
    return onFailure(this.getError());
  }
}

export class Success<T> extends Result<T> {
  private constructor(private value: T) {
    super();
  }

  static create<T>(value: T): Success<T> {
    return new Success(value);
  }

  isSuccess(): boolean {
    return true;
  }

  isFailure(): boolean {
    return false;
  }

  getValue(): T {
    return this.value;
  }

  getError(): Error {
    throw new Error("Cannot get error from Success");
  }
}

export class Failure<T> extends Result<T> {
  private constructor(private error: Error) {
    super();
  }

  static create<T>(error: Error): Failure<T> {
    return new Failure(error);
  }

  isSuccess(): boolean {
    return false;
  }

  isFailure(): boolean {
    return true;
  }

  getValue(): T {
    throw this.error;
  }

  getError(): Error {
    return this.error;
  }
}

// Hierarquia de erros de domínio
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}

export class DatabaseError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}
