/**
 * Result Pattern para tratamento de erros seguindo Clean Architecture
 * Evita o uso de exceptions para fluxo de controle
 */

export class Result<T, E = Error> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  public static success<T, E = Error>(value: T): Result<T, E> {
    return new Result<T, E>(true, value);
  }

  public static failure<T, E = Error>(error: E): Result<T, E> {
    return new Result<T, E>(false, undefined, error);
  }

  public get isSuccess(): boolean {
    return this._isSuccess;
  }

  public get isFailure(): boolean {
    return !this._isSuccess;
  }

  public get value(): T {
    if (!this._isSuccess) {
      throw new Error("Cannot get value from failed result");
    }
    return this._value!;
  }

  public get error(): E {
    if (this._isSuccess) {
      throw new Error("Cannot get error from successful result");
    }
    return this._error!;
  }

  public map<U>(fn: (value: T) => U): Result<U, E> {
    if (this._isSuccess) {
      return Result.success(fn(this._value!));
    }
    return Result.failure(this._error!);
  }

  public mapError<F>(fn: (error: E) => F): Result<T, F> {
    if (this._isSuccess) {
      return Result.success(this._value!);
    }
    return Result.failure(fn(this._error!));
  }

  public flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this._isSuccess) {
      return fn(this._value!);
    }
    return Result.failure(this._error!);
  }

  public match<U>(onSuccess: (value: T) => U, onFailure: (error: E) => U): U {
    if (this._isSuccess) {
      return onSuccess(this._value!);
    }
    return onFailure(this._error!);
  }
}

/**
 * Tipos de erro específicos do domínio
 */
export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: string
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} não encontrado`, "NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export class NetworkError extends DomainError {
  constructor(message: string = "Erro de conectividade") {
    super(message, "NETWORK_ERROR");
    this.name = "NetworkError";
  }
}

export class UnauthorizedError extends DomainError {
  constructor(message: string = "Não autorizado") {
    super(message, "UNAUTHORIZED");
    this.name = "UnauthorizedError";
  }
}

export class DatabaseError extends DomainError {
  constructor(message: string = "Erro de banco de dados") {
    super(message, "DATABASE_ERROR");
    this.name = "DatabaseError";
  }
}

/**
 * Classes auxiliares para criação de Results
 */
export class Success {
  static create<T>(value: T): Result<T> {
    return Result.success(value);
  }
}

export class Failure {
  static create<T>(error: Error): Result<T> {
    return Result.failure(error);
  }
}

/**
 * Tipos auxiliares para Results
 */
export type VoidResult<E = DomainError> = Result<void, E>;
export type BooleanResult<E = DomainError> = Result<boolean, E>;
