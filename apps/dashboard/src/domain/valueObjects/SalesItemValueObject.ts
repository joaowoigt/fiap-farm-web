/**
 * SalesItem Value Object
 *
 * Encapsula as regras de negócio para itens de venda
 * seguindo princípios DDD e Value Object pattern
 */

import { ProductValueObject } from "./ProductValueObject";
import { Result, Success, Failure, ValidationError } from "../common/Result";

export class SalesItemValueObject {
  private constructor(
    public readonly product: ProductValueObject,
    public readonly quantity: number,
    public readonly income: number,
    public readonly saleDate: Date
  ) {}

  /**
   * Factory method principal para criar itens de venda
   */
  public static create(
    product: ProductValueObject,
    quantity: number,
    saleDate?: Date
  ): Result<SalesItemValueObject> {
    // Validação do produto
    if (!product) {
      return Failure.create(
        new ValidationError("Produto é obrigatório para criar item de venda")
      );
    } // Validação da quantidade
    const quantityValidation = this.validateQuantity(quantity);
    if (quantityValidation.isFailure) {
      return Failure.create(quantityValidation.error!);
    }

    // Validação da data
    const dateValidation = this.validateSaleDate(saleDate);
    if (dateValidation.isFailure) {
      return Failure.create(dateValidation.error!);
    }

    // Calcular receita
    const incomeResult = product.calculateTotalValue(quantity);
    if (incomeResult.isFailure) {
      return Failure.create(incomeResult.error);
    }

    const finalDate = saleDate || new Date();

    return Success.create(
      new SalesItemValueObject(product, quantity, incomeResult.value, finalDate)
    );
  }

  /**
   * Factory method para criar a partir de dados legacy
   */
  public static fromLegacyData(
    productName: string,
    productType: any,
    productUnitValue: number,
    quantity: number,
    saleDate?: Date
  ): Result<SalesItemValueObject> {
    const productResult = ProductValueObject.create(
      productName,
      productType,
      productUnitValue
    );

    if (productResult.isFailure) {
      return Failure.create(productResult.error);
    }

    return this.create(productResult.value, quantity, saleDate);
  }

  /**
   * Validações específicas do domínio
   */
  private static validateQuantity(quantity: number): Result<void> {
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

    if (quantity > 100000) {
      return Failure.create(
        new ValidationError("Quantidade não pode exceder 100.000 unidades")
      );
    }

    return Success.create(undefined);
  }

  private static validateSaleDate(saleDate?: Date): Result<void> {
    if (!saleDate) {
      return Success.create(undefined); // Data opcional, será definida como hoje
    }

    if (!(saleDate instanceof Date) || isNaN(saleDate.getTime())) {
      return Failure.create(new ValidationError("Data de venda inválida"));
    }

    const now = new Date();
    const maxPastDate = new Date();
    maxPastDate.setFullYear(now.getFullYear() - 5); // Máximo 5 anos no passado

    if (saleDate < maxPastDate) {
      return Failure.create(
        new ValidationError("Data de venda não pode ser anterior a 5 anos")
      );
    }

    if (saleDate > now) {
      return Failure.create(
        new ValidationError("Data de venda não pode ser no futuro")
      );
    }

    return Success.create(undefined);
  }

  /**
   * Métodos de domínio
   */
  public increaseQuantity(
    additionalQuantity: number
  ): Result<SalesItemValueObject> {
    if (additionalQuantity <= 0) {
      return Failure.create(
        new ValidationError("Quantidade adicional deve ser positiva")
      );
    }

    const newQuantity = this.quantity + additionalQuantity;
    return SalesItemValueObject.create(
      this.product,
      newQuantity,
      this.saleDate
    );
  }

  public calculateProfitMargin(costPerUnit: number): Result<number> {
    if (costPerUnit < 0) {
      return Failure.create(
        new ValidationError("Custo por unidade não pode ser negativo")
      );
    }

    if (costPerUnit >= this.product.unitValue) {
      return Success.create(0); // Sem lucro
    }

    const profit = this.product.unitValue - costPerUnit;
    const margin = (profit / this.product.unitValue) * 100;

    return Success.create(Number(margin.toFixed(2)));
  }

  public isHighValue(): boolean {
    return this.income >= 1000; // Vendas acima de R$ 1.000
  }

  public isSameProduct(other: SalesItemValueObject): boolean {
    return this.product.equals(other.product);
  }

  public isRecentSale(days: number = 30): boolean {
    const daysDiff =
      (Date.now() - this.saleDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff <= days;
  }

  public formatIncome(): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(this.income);
  }

  public formatSaleDate(): string {
    return this.saleDate.toLocaleDateString("pt-BR");
  }

  /**
   * Igualdade baseada em valor
   */
  public equals(other: SalesItemValueObject): boolean {
    return (
      this.product.equals(other.product) &&
      this.quantity === other.quantity &&
      this.income === other.income &&
      this.saleDate.getTime() === other.saleDate.getTime()
    );
  }

  /**
   * Conversão para interface legacy
   */
  public toSalesItem() {
    return {
      product: this.product.toProduct(),
      quantity: this.quantity,
      income: this.income,
    };
  }
}
