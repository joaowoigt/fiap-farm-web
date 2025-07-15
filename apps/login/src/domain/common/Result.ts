/**
 * Result Pattern Implementation
 *
 * Implementa o padrão Result para tratamento de erros sem exceptions
 * Reutilizando a mesma estrutura do dashboard app
 */

// Base Error classes
export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

export class NetworkError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}

// Result Pattern base
export abstract class Result<T, E = DomainError> {
  constructor(
    public readonly isSuccess: boolean,
    public readonly error?: E,
    private readonly _value?: T
  ) {}

  public get isFailure(): boolean {
    return !this.isSuccess;
  }

  public get value(): T {
    if (this.isFailure) {
      throw new Error("Cannot get value from a failed result");
    }
    return this._value!;
  }
}

// Success implementation
export class Success<T> extends Result<T> {
  constructor(value: T) {
    super(true, undefined, value);
  }

  public static create<T>(value: T): Success<T> {
    return new Success(value);
  }
}

// Failure implementation
export class Failure<E extends DomainError = DomainError> extends Result<
  never,
  E
> {
  constructor(error: E) {
    super(false, error);
  }

  public static create<E extends DomainError>(error: E): Failure<E> {
    return new Failure(error);
  }
}
