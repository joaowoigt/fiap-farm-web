/**
 * Value Objects para validações de domínio
 * Seguindo os princípios de Domain-Driven Design (DDD)
 */

import { ValidationError } from "../common/Result";

export class Email {
  private readonly value: string;

  constructor(email: string) {
    if (!email) {
      throw new ValidationError("Email é obrigatório");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError("Email inválido");
    }

    this.value = email.toLowerCase().trim();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export class UserId {
  private readonly value: string;

  constructor(id: string) {
    if (!id || id.trim().length === 0) {
      throw new ValidationError("ID do usuário é obrigatório");
    }

    if (id.length < 3) {
      throw new ValidationError(
        "ID do usuário deve ter pelo menos 3 caracteres"
      );
    }

    this.value = id.trim();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: UserId): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export class ProductName {
  private readonly value: string;

  constructor(name: string) {
    if (!name || name.trim().length === 0) {
      throw new ValidationError("Nome do produto é obrigatório");
    }

    if (name.trim().length < 2) {
      throw new ValidationError(
        "Nome do produto deve ter pelo menos 2 caracteres"
      );
    }

    if (name.trim().length > 100) {
      throw new ValidationError(
        "Nome do produto não pode exceder 100 caracteres"
      );
    }

    this.value = name.trim();
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: ProductName): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}

export class PositiveNumber {
  private readonly value: number;

  constructor(number: number, fieldName: string = "valor") {
    if (number === null || number === undefined) {
      throw new ValidationError(`${fieldName} é obrigatório`);
    }

    if (typeof number !== "number" || isNaN(number)) {
      throw new ValidationError(`${fieldName} deve ser um número válido`);
    }

    if (number <= 0) {
      throw new ValidationError(`${fieldName} deve ser um número positivo`);
    }

    this.value = number;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: PositiveNumber): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value.toString();
  }
}

export class MonetaryValue {
  private readonly value: number;

  constructor(amount: number) {
    if (amount === null || amount === undefined) {
      throw new ValidationError("Valor monetário é obrigatório");
    }

    if (typeof amount !== "number" || isNaN(amount)) {
      throw new ValidationError("Valor monetário deve ser um número válido");
    }

    if (amount < 0) {
      throw new ValidationError("Valor monetário não pode ser negativo");
    }

    // Arredonda para 2 casas decimais
    this.value = Math.round(amount * 100) / 100;
  }

  public getValue(): number {
    return this.value;
  }

  public equals(other: MonetaryValue): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value.toFixed(2);
  }

  public toCurrency(
    locale: string = "pt-BR",
    currency: string = "BRL"
  ): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(this.value);
  }
}
