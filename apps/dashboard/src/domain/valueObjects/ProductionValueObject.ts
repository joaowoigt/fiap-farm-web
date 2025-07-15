/**
 * Production Value Object
 *
 * Encapsula as regras de negócio para produção agrícola
 * seguindo princípios DDD e Value Object pattern
 */

import { ProductValueObject } from "./ProductValueObject";
import { Status } from "../models/farm/production/Status";
import { Type } from "../models/farm/product/Type";
import { Result, Success, Failure, ValidationError } from "../common/Result";

export class ProductionValueObject {
  private constructor(
    public readonly product: ProductValueObject,
    public readonly quantity: number,
    public readonly status: Status,
    public readonly productionDate: Date,
    public readonly estimatedHarvestDate?: Date
  ) {}

  /**
   * Factory method para criar produção válida
   */
  public static create(
    product: ProductValueObject,
    quantity: number,
    status: Status,
    productionDate?: Date,
    estimatedHarvestDate?: Date
  ): Result<ProductionValueObject> {
    // Validação do produto
    if (!product) {
      return Failure.create(
        new ValidationError("Produto é obrigatório para produção")
      );
    }

    // Validação da quantidade
    const quantityValidation = this.validateQuantity(quantity, product.type);
    if (quantityValidation.isFailure) {
      return quantityValidation;
    }

    // Validação do status
    const statusValidation = this.validateStatus(status);
    if (statusValidation.isFailure) {
      return statusValidation;
    }

    // Validação das datas
    const finalProductionDate = productionDate || new Date();
    const dateValidation = this.validateDates(
      finalProductionDate,
      estimatedHarvestDate
    );
    if (dateValidation.isFailure) {
      return dateValidation;
    }

    return Success.create(
      new ProductionValueObject(
        product,
        quantity,
        status,
        finalProductionDate,
        estimatedHarvestDate
      )
    );
  }

  /**
   * Factory method para criar a partir de dados legacy
   */
  public static fromLegacyData(
    productName: string,
    productType: Type,
    productUnitValue: number,
    quantity: number,
    status: Status,
    productionDate?: Date
  ): Result<ProductionValueObject> {
    const productResult = ProductValueObject.create(
      productName,
      productType,
      productUnitValue
    );

    if (productResult.isFailure) {
      return Failure.create(productResult.error);
    }

    return this.create(productResult.value, quantity, status, productionDate);
  }

  /**
   * Validações específicas do domínio
   */
  private static validateQuantity(
    quantity: number,
    productType: Type
  ): Result<void> {
    if (quantity === null || quantity === undefined) {
      return Failure.create(new ValidationError("Quantidade é obrigatória"));
    }

    if (isNaN(quantity)) {
      return Failure.create(
        new ValidationError("Quantidade deve ser um número válido")
      );
    }

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

    // Limites específicos por tipo de produto
    const maxQuantityByType = this.getMaxProductionQuantityByType(productType);
    if (quantity > maxQuantityByType) {
      return Failure.create(
        new ValidationError(
          `Quantidade máxima para produção de ${productType} é ${maxQuantityByType} unidades`
        )
      );
    }

    return Success.create(undefined);
  }

  private static validateStatus(status: Status): Result<void> {
    if (!status) {
      return Failure.create(
        new ValidationError("Status da produção é obrigatório")
      );
    }

    const validStatuses = Object.values(Status);
    if (!validStatuses.includes(status)) {
      return Failure.create(new ValidationError("Status da produção inválido"));
    }

    return Success.create(undefined);
  }

  private static validateDates(
    productionDate: Date,
    estimatedHarvestDate?: Date
  ): Result<void> {
    if (!(productionDate instanceof Date) || isNaN(productionDate.getTime())) {
      return Failure.create(new ValidationError("Data de produção inválida"));
    }

    const now = new Date();
    const maxPastDate = new Date();
    maxPastDate.setFullYear(now.getFullYear() - 2); // Máximo 2 anos no passado

    if (productionDate < maxPastDate) {
      return Failure.create(
        new ValidationError("Data de produção não pode ser anterior a 2 anos")
      );
    }

    if (productionDate > now) {
      return Failure.create(
        new ValidationError("Data de produção não pode ser no futuro")
      );
    }

    if (estimatedHarvestDate) {
      if (
        !(estimatedHarvestDate instanceof Date) ||
        isNaN(estimatedHarvestDate.getTime())
      ) {
        return Failure.create(
          new ValidationError("Data estimada de colheita inválida")
        );
      }

      if (estimatedHarvestDate <= productionDate) {
        return Failure.create(
          new ValidationError(
            "Data de colheita deve ser posterior à data de produção"
          )
        );
      }

      const maxHarvestDate = new Date(productionDate);
      maxHarvestDate.setFullYear(maxHarvestDate.getFullYear() + 1); // Máximo 1 ano após produção

      if (estimatedHarvestDate > maxHarvestDate) {
        return Failure.create(
          new ValidationError(
            "Data de colheita não pode ser superior a 1 ano após a produção"
          )
        );
      }
    }

    return Success.create(undefined);
  }

  /**
   * Métodos de domínio
   */
  public canBeHarvested(): boolean {
    return this.status === Status.done;
  }

  public isInProgress(): boolean {
    return this.status === Status.inProgress;
  }

  public isWaiting(): boolean {
    return this.status === Status.waiting;
  }

  public advanceToNextStatus(): Result<ProductionValueObject> {
    let nextStatus: Status;

    switch (this.status) {
      case Status.waiting:
        nextStatus = Status.inProgress;
        break;
      case Status.inProgress:
        nextStatus = Status.done;
        break;
      case Status.done:
        return Failure.create(
          new ValidationError("Produção já está concluída")
        );
      default:
        return Failure.create(new ValidationError("Status atual inválido"));
    }

    return ProductionValueObject.create(
      this.product,
      this.quantity,
      nextStatus,
      this.productionDate,
      this.estimatedHarvestDate
    );
  }

  public calculateEstimatedValue(): number {
    return this.product.unitValue * this.quantity;
  }

  public isOverdue(): boolean {
    if (!this.estimatedHarvestDate) {
      return false;
    }

    const now = new Date();
    return now > this.estimatedHarvestDate && !this.canBeHarvested();
  }

  public getDaysUntilHarvest(): number | null {
    if (!this.estimatedHarvestDate || this.canBeHarvested()) {
      return null;
    }

    const now = new Date();
    const timeDiff = this.estimatedHarvestDate.getTime() - now.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  public isHighValueProduction(): boolean {
    return this.calculateEstimatedValue() >= 5000; // Produções acima de R$ 5.000
  }

  public getProductionAge(): number {
    const now = new Date();
    const timeDiff = now.getTime() - this.productionDate.getTime();
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  }

  public formatEstimatedValue(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.calculateEstimatedValue());
  }

  /**
   * Métodos auxiliares privados
   */
  private static getMaxProductionQuantityByType(type: Type): number {
    const maxQuantities = {
      [Type.crops]: 50000, // Cultivos: até 50.000 unidades
      [Type.livestock]: 1000, // Gado: até 1.000 cabeças
      [Type.dairy]: 5000, // Lácteos: até 5.000 litros
    };

    return maxQuantities[type] || 10000;
  }

  /**
   * Igualdade baseada em valor
   */
  public equals(other: ProductionValueObject): boolean {
    return (
      this.product.equals(other.product) &&
      this.quantity === other.quantity &&
      this.status === other.status &&
      this.productionDate.getTime() === other.productionDate.getTime() &&
      this.estimatedHarvestDate?.getTime() ===
        other.estimatedHarvestDate?.getTime()
    );
  }

  /**
   * Conversão para interface legacy
   */
  public toProduction() {
    return {
      product: this.product.toProduct(),
      quantity: this.quantity,
      status: this.status,
    };
  }
}
