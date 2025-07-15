/**
 * SalesBusinessService
 *
 * Implementa regras de negócio complexas relacionadas a vendas
 * seguindo o padrão Domain Service para operações que não pertencem
 * naturalmente a uma única entidade
 */

import { SalesItemValueObject } from "../valueObjects/SalesItemValueObject";
import { ProductValueObject } from "../valueObjects/ProductValueObject";
import { Type } from "../models/farm/product/Type";
import { Result, Success, Failure, ValidationError } from "../common/Result";

export interface SalesBusinessRules {
  /**
   * Verifica se a venda está dentro das regras de negócio
   */
  validateSale(salesItem: SalesItemValueObject): Result<void>;

  /**
   * Aplica desconto baseado em volume
   */
  applyVolumeDiscount(
    salesItem: SalesItemValueObject
  ): Result<SalesItemValueObject>;

  /**
   * Verifica se a venda pode ser combinada com outra existente
   */
  canCombineSales(
    existing: SalesItemValueObject,
    newSale: SalesItemValueObject
  ): boolean;

  /**
   * Combina vendas do mesmo produto
   */
  combineSales(
    existing: SalesItemValueObject,
    newSale: SalesItemValueObject
  ): Result<SalesItemValueObject>;

  /**
   * Calcula métricas de performance de vendas
   */
  calculateSalesMetrics(sales: SalesItemValueObject[]): SalesMetrics;
}

export interface SalesMetrics {
  totalRevenue: number;
  averageSaleValue: number;
  bestSellingProductType: Type | null;
  highValueSalesCount: number;
  salesByType: Map<Type, number>;
}

export class SalesBusinessService implements SalesBusinessRules {
  /**
   * Regras de negócio para validação de vendas
   */
  public validateSale(salesItem: SalesItemValueObject): Result<void> {
    // Regra: Vendas de produtos lácteos não podem ser muito antigas (máximo 7 dias)
    if (salesItem.product.type === Type.dairy) {
      if (!salesItem.isRecentSale(7)) {
        return Failure.create(
          new ValidationError(
            "Vendas de produtos lácteos devem ser registradas em até 7 dias"
          )
        );
      }
    }

    // Regra: Vendas muito altas precisam de aprovação (acima de R$ 10.000)
    if (salesItem.income > 10000) {
      return Failure.create(
        new ValidationError(
          "Vendas acima de R$ 10.000 requerem aprovação prévia"
        )
      );
    }

    // Regra: Quantidade máxima por tipo de produto
    const maxQuantityByType = this.getMaxQuantityByType(salesItem.product.type);
    if (salesItem.quantity > maxQuantityByType) {
      return Failure.create(
        new ValidationError(
          `Quantidade máxima para ${salesItem.product.type} é ${maxQuantityByType} unidades`
        )
      );
    }

    return Success.create(undefined);
  }

  /**
   * Aplica desconto baseado em volume de vendas
   */
  public applyVolumeDiscount(
    salesItem: SalesItemValueObject
  ): Result<SalesItemValueObject> {
    const discountRate = this.calculateVolumeDiscountRate(salesItem.quantity);

    if (discountRate === 0) {
      return Success.create(salesItem); // Sem desconto
    }

    const discountedUnitValue =
      Math.round(salesItem.product.unitValue * (1 - discountRate) * 100) / 100;

    const discountedProductResult = ProductValueObject.create(
      salesItem.product.name,
      salesItem.product.type,
      discountedUnitValue
    );

    if (discountedProductResult.isFailure) {
      return Failure.create(discountedProductResult.error);
    }

    return SalesItemValueObject.create(
      discountedProductResult.value,
      salesItem.quantity
    );
  }

  /**
   * Verifica se duas vendas podem ser combinadas
   */
  public canCombineSales(
    existing: SalesItemValueObject,
    newSale: SalesItemValueObject
  ): boolean {
    return (
      existing.isSameProduct(newSale) &&
      existing.isRecentSale(1) && // Vendas do mesmo dia podem ser combinadas
      newSale.isRecentSale(1)
    );
  }

  /**
   * Combina vendas do mesmo produto
   */
  public combineSales(
    existing: SalesItemValueObject,
    newSale: SalesItemValueObject
  ): Result<SalesItemValueObject> {
    if (!this.canCombineSales(existing, newSale)) {
      return Failure.create(
        new ValidationError("Vendas não podem ser combinadas")
      );
    }

    return existing.increaseQuantity(newSale.quantity);
  }

  /**
   * Calcula métricas detalhadas de vendas
   */
  public calculateSalesMetrics(sales: SalesItemValueObject[]): SalesMetrics {
    if (sales.length === 0) {
      return {
        totalRevenue: 0,
        averageSaleValue: 0,
        bestSellingProductType: null,
        highValueSalesCount: 0,
        salesByType: new Map(),
      };
    }

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.income, 0);
    const averageSaleValue = totalRevenue / sales.length;
    const highValueSalesCount = sales.filter((sale) =>
      sale.isHighValue()
    ).length;

    // Vendas por tipo
    const salesByType = new Map<Type, number>();
    sales.forEach((sale) => {
      const currentValue = salesByType.get(sale.product.type) || 0;
      salesByType.set(sale.product.type, currentValue + sale.income);
    });

    // Tipo mais vendido
    let bestSellingProductType: Type | null = null;
    let maxRevenue = 0;

    salesByType.forEach((revenue, type) => {
      if (revenue > maxRevenue) {
        maxRevenue = revenue;
        bestSellingProductType = type;
      }
    });

    return {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      averageSaleValue: Number(averageSaleValue.toFixed(2)),
      bestSellingProductType,
      highValueSalesCount,
      salesByType,
    };
  }

  /**
   * Métodos auxiliares privados
   */
  private getMaxQuantityByType(type: Type): number {
    const maxQuantities = {
      [Type.crops]: 10000, // Cultivos: até 10.000 unidades
      [Type.livestock]: 500, // Gado: até 500 cabeças
      [Type.dairy]: 1000, // Lácteos: até 1.000 litros
    };

    return maxQuantities[type] || 1000;
  }

  private calculateVolumeDiscountRate(quantity: number): number {
    if (quantity >= 1000) return 0.1; // 10% desconto para 1000+ unidades
    if (quantity >= 500) return 0.05; // 5% desconto para 500+ unidades
    if (quantity >= 100) return 0.02; // 2% desconto para 100+ unidades

    return 0; // Sem desconto
  }

  /**
   * Métodos de análise de tendências
   */
  public analyzeSalesTrend(sales: SalesItemValueObject[]): string {
    if (sales.length < 2) return "Dados insuficientes para análise";

    const recentSales = sales.filter((sale) => sale.isRecentSale(30));
    const olderSales = sales.filter(
      (sale) => !sale.isRecentSale(30) && sale.isRecentSale(60)
    );

    if (recentSales.length === 0) return "Sem vendas recentes";
    if (olderSales.length === 0) return "Período de comparação insuficiente";

    const recentRevenue = recentSales.reduce(
      (sum, sale) => sum + sale.income,
      0
    );
    const olderRevenue = olderSales.reduce((sum, sale) => sum + sale.income, 0);

    const percentageChange =
      ((recentRevenue - olderRevenue) / olderRevenue) * 100;

    if (percentageChange > 10) return "Tendência de crescimento forte";
    if (percentageChange > 0) return "Tendência de crescimento";
    if (percentageChange > -10) return "Tendência estável";

    return "Tendência de declínio";
  }
}
