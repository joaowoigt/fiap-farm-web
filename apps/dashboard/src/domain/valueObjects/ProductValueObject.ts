/**
 * Product Value Object
 *
 * Implementa validações de domínio para produtos agrícolas
 * seguindo o padrão Value Object e princípios DDD
 */

import { Type } from "../models/farm/product/Type";
import { Result, Success, Failure, ValidationError } from "../common/Result";

export class ProductValueObject {
  private constructor(
    public readonly name: string,
    public readonly type: Type,
    public readonly unitValue: number
  ) {}

  /**
   * Factory method para criar um produto válido
   * Implementa todas as regras de negócio para produtos
   */ public static create(
    name: string,
    type: Type,
    unitValue: number
  ): Result<ProductValueObject> {
    // Validação do nome
    const nameValidation = this.validateName(name);
    if (nameValidation.isFailure) {
      return Failure.create(nameValidation.error!);
    }

    // Validação do tipo
    const typeValidation = this.validateType(type);
    if (typeValidation.isFailure) {
      return Failure.create(typeValidation.error!);
    }

    // Validação do valor unitário
    const unitValueValidation = this.validateUnitValue(unitValue);
    if (unitValueValidation.isFailure) {
      return Failure.create(unitValueValidation.error!);
    }

    return Success.create(new ProductValueObject(name, type, unitValue));
  }

  /**
   * Validações específicas do domínio
   */
  private static validateName(name: string): Result<void> {
    if (!name || name.trim().length === 0) {
      return Failure.create(
        new ValidationError("Nome do produto é obrigatório")
      );
    }

    if (name.trim().length < 2) {
      return Failure.create(
        new ValidationError("Nome do produto deve ter pelo menos 2 caracteres")
      );
    }

    if (name.trim().length > 100) {
      return Failure.create(
        new ValidationError("Nome do produto não pode exceder 100 caracteres")
      );
    }

    // Validar caracteres especiais não permitidos
    const invalidCharsRegex = /[<>@!#$%^&*()_+={}[\]|\\:";'<>?,./]/;
    if (invalidCharsRegex.test(name)) {
      return Failure.create(
        new ValidationError("Nome do produto contém caracteres inválidos")
      );
    }

    return Success.create(undefined);
  }

  private static validateType(type: Type): Result<void> {
    if (!type) {
      return Failure.create(
        new ValidationError("Tipo do produto é obrigatório")
      );
    }

    const validTypes = Object.values(Type);
    if (!validTypes.includes(type)) {
      return Failure.create(new ValidationError("Tipo do produto inválido"));
    }

    return Success.create(undefined);
  }

  private static validateUnitValue(unitValue: number): Result<void> {
    if (unitValue === null || unitValue === undefined) {
      return Failure.create(
        new ValidationError("Valor unitário é obrigatório")
      );
    }

    if (isNaN(unitValue)) {
      return Failure.create(
        new ValidationError("Valor unitário deve ser um número válido")
      );
    }

    if (unitValue <= 0) {
      return Failure.create(
        new ValidationError("Valor unitário deve ser positivo")
      );
    }

    if (unitValue > 1000000) {
      return Failure.create(
        new ValidationError("Valor unitário não pode exceder R$ 1.000.000")
      );
    }

    // Validar precisão decimal (máximo 2 casas)
    const decimalPlaces = (unitValue.toString().split(".")[1] || "").length;
    if (decimalPlaces > 2) {
      return Failure.create(
        new ValidationError(
          "Valor unitário deve ter no máximo 2 casas decimais"
        )
      );
    }

    return Success.create(undefined);
  }

  /**
   * Métodos de domínio
   */
  public calculateTotalValue(quantity: number): Result<number> {
    if (quantity <= 0) {
      return Failure.create(
        new ValidationError("Quantidade deve ser positiva")
      );
    }

    if (!Number.isInteger(quantity)) {
      return Failure.create(
        new ValidationError("Quantidade deve ser um número inteiro")
      );
    }

    const total = this.unitValue * quantity;
    return Success.create(Number(total.toFixed(2)));
  }

  public isOfType(type: Type): boolean {
    return this.type === type;
  }

  public formatPrice(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.unitValue);
  }

  /**
   * Igualdade baseada em valor
   */
  public equals(other: ProductValueObject): boolean {
    return (
      this.name === other.name &&
      this.type === other.type &&
      this.unitValue === other.unitValue
    );
  }

  /**
   * Conversão para interface legacy
   */
  public toProduct() {
    return {
      name: this.name,
      type: this.type,
      unitValue: this.unitValue,
    };
  }
}
