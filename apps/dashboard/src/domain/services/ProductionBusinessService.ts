/**
 * ProductionBusinessService
 *
 * Implementa regras de negócio complexas relacionadas à produção agrícola
 * seguindo o padrão Domain Service
 */

import { ProductionValueObject } from "../valueObjects/ProductionValueObject";
import { Type } from "../models/farm/product/Type";
import { Status } from "../models/farm/production/Status";
import { Result, Success, Failure, ValidationError } from "../common/Result";

export interface ProductionBusinessRules {
  /**
   * Verifica se a produção pode ser iniciada
   */
  canStartProduction(production: ProductionValueObject): Result<void>;

  /**
   * Verifica se a produção pode avançar para o próximo status
   */
  canAdvanceStatus(production: ProductionValueObject): Result<void>;

  /**
   * Calcula o cronograma otimizado de produção
   */
  calculateOptimalSchedule(
    productions: ProductionValueObject[]
  ): ProductionSchedule;

  /**
   * Verifica conflitos de recursos entre produções
   */
  checkResourceConflicts(
    newProduction: ProductionValueObject,
    existingProductions: ProductionValueObject[]
  ): Result<void>;

  /**
   * Calcula métricas de eficiência da produção
   */
  calculateProductionMetrics(
    productions: ProductionValueObject[]
  ): ProductionMetrics;
}

export interface ProductionSchedule {
  totalEstimatedValue: number;
  overdueProductions: ProductionValueObject[];
  upcomingHarvests: Array<{
    production: ProductionValueObject;
    daysUntilHarvest: number;
  }>;
  productionsByStatus: Map<Status, ProductionValueObject[]>;
}

export interface ProductionMetrics {
  totalProductions: number;
  totalEstimatedValue: number;
  averageProductionValue: number;
  productionsByType: Map<Type, number>;
  statusDistribution: Map<Status, number>;
  efficiencyScore: number;
  overdueCount: number;
}

export class ProductionBusinessService implements ProductionBusinessRules {
  /**
   * Verifica se uma produção pode ser iniciada baseada em regras de negócio
   */
  public canStartProduction(production: ProductionValueObject): Result<void> {
    // Regra: Produtos lácteos não podem ter produções muito longas
    if (production.product.type === Type.dairy) {
      const daysUntilHarvest = production.getDaysUntilHarvest();
      if (daysUntilHarvest && daysUntilHarvest > 30) {
        return Failure.create(
          new ValidationError("Produções de lácteos não podem exceder 30 dias")
        );
      }
    }

    // Regra: Produções de alto valor precisam de aprovação
    if (production.isHighValueProduction()) {
      return Failure.create(
        new ValidationError(
          "Produções de alto valor (>R$ 5.000) requerem aprovação prévia"
        )
      );
    }

    // Regra: Verificar limites sazonais
    const seasonalValidation = this.validateSeasonalLimits(production);
    if (seasonalValidation.isFailure) {
      return seasonalValidation;
    }

    return Success.create(undefined);
  }

  /**
   * Verifica se uma produção pode avançar para o próximo status
   */
  public canAdvanceStatus(production: ProductionValueObject): Result<void> {
    // Regra: Produções em andamento devem ter tempo mínimo
    if (production.isInProgress()) {
      const ageInDays = production.getProductionAge();
      const minDaysByType = this.getMinimumProductionDays(
        production.product.type
      );

      if (ageInDays < minDaysByType) {
        return Failure.create(
          new ValidationError(
            `Produção de ${production.product.type} deve ter pelo menos ${minDaysByType} dias`
          )
        );
      }
    }

    // Regra: Produções já concluídas não podem avançar
    if (production.canBeHarvested()) {
      return Failure.create(new ValidationError("Produção já está concluída"));
    }

    return Success.create(undefined);
  }

  /**
   * Calcula cronograma otimizado considerando todas as produções
   */
  public calculateOptimalSchedule(
    productions: ProductionValueObject[]
  ): ProductionSchedule {
    const totalEstimatedValue = productions.reduce(
      (sum, prod) => sum + prod.calculateEstimatedValue(),
      0
    );

    const overdueProductions = productions.filter((prod) => prod.isOverdue());

    const upcomingHarvests = productions
      .filter(
        (prod) => !prod.canBeHarvested() && prod.getDaysUntilHarvest() !== null
      )
      .map((prod) => ({
        production: prod,
        daysUntilHarvest: prod.getDaysUntilHarvest()!,
      }))
      .sort((a, b) => a.daysUntilHarvest - b.daysUntilHarvest);

    const productionsByStatus = new Map<Status, ProductionValueObject[]>();
    Object.values(Status).forEach((status) => {
      productionsByStatus.set(
        status,
        productions.filter((prod) => prod.status === status)
      );
    });

    return {
      totalEstimatedValue: Number(totalEstimatedValue.toFixed(2)),
      overdueProductions,
      upcomingHarvests,
      productionsByStatus,
    };
  }

  /**
   * Verifica conflitos de recursos entre produções
   */
  public checkResourceConflicts(
    newProduction: ProductionValueObject,
    existingProductions: ProductionValueObject[]
  ): Result<void> {
    // Regra: Limite de produções simultâneas por tipo
    const sameTypeProductions = existingProductions.filter(
      (prod) =>
        prod.product.type === newProduction.product.type &&
        !prod.canBeHarvested()
    );

    const maxSimultaneousProductions = this.getMaxSimultaneousProductions(
      newProduction.product.type
    );

    if (sameTypeProductions.length >= maxSimultaneousProductions) {
      return Failure.create(
        new ValidationError(
          `Limite de ${maxSimultaneousProductions} produções simultâneas de ${newProduction.product.type} atingido`
        )
      );
    }

    // Regra: Verificar capacidade total de produção
    const totalActiveProductions = existingProductions.filter(
      (prod) => !prod.canBeHarvested()
    );
    const totalEstimatedValue =
      totalActiveProductions.reduce(
        (sum, prod) => sum + prod.calculateEstimatedValue(),
        0
      ) + newProduction.calculateEstimatedValue();

    const maxTotalValue = 100000; // R$ 100.000 máximo em produções ativas
    if (totalEstimatedValue > maxTotalValue) {
      return Failure.create(
        new ValidationError(
          `Valor total de produções ativas não pode exceder R$ ${maxTotalValue.toLocaleString("pt-BR")}`
        )
      );
    }

    return Success.create(undefined);
  }

  /**
   * Calcula métricas detalhadas de produção
   */
  public calculateProductionMetrics(
    productions: ProductionValueObject[]
  ): ProductionMetrics {
    if (productions.length === 0) {
      return {
        totalProductions: 0,
        totalEstimatedValue: 0,
        averageProductionValue: 0,
        productionsByType: new Map(),
        statusDistribution: new Map(),
        efficiencyScore: 0,
        overdueCount: 0,
      };
    }

    const totalEstimatedValue = productions.reduce(
      (sum, prod) => sum + prod.calculateEstimatedValue(),
      0
    );

    const averageProductionValue = totalEstimatedValue / productions.length;

    // Distribuição por tipo
    const productionsByType = new Map<Type, number>();
    productions.forEach((prod) => {
      const currentCount = productionsByType.get(prod.product.type) || 0;
      productionsByType.set(prod.product.type, currentCount + 1);
    });

    // Distribuição por status
    const statusDistribution = new Map<Status, number>();
    Object.values(Status).forEach((status) => {
      const count = productions.filter((prod) => prod.status === status).length;
      statusDistribution.set(status, count);
    });

    // Cálculo de eficiência
    const overdueCount = productions.filter((prod) => prod.isOverdue()).length;
    const completedCount = productions.filter((prod) =>
      prod.canBeHarvested()
    ).length;
    const efficiencyScore =
      productions.length > 0
        ? (completedCount / productions.length) * 100 -
          (overdueCount / productions.length) * 50
        : 0;

    return {
      totalProductions: productions.length,
      totalEstimatedValue: Number(totalEstimatedValue.toFixed(2)),
      averageProductionValue: Number(averageProductionValue.toFixed(2)),
      productionsByType,
      statusDistribution,
      efficiencyScore: Math.max(0, Math.min(100, efficiencyScore)),
      overdueCount,
    };
  }

  /**
   * Métodos auxiliares privados
   */
  private validateSeasonalLimits(
    production: ProductionValueObject
  ): Result<void> {
    const currentMonth = new Date().getMonth(); // 0-11

    // Regras sazonais para cultivos
    if (production.product.type === Type.crops) {
      // Evitar plantio em meses de inverno extremo (junho-agosto no Brasil)
      if (currentMonth >= 5 && currentMonth <= 7) {
        if (production.quantity > 1000) {
          return Failure.create(
            new ValidationError(
              "Grandes plantios não são recomendados durante o inverno"
            )
          );
        }
      }
    }

    return Success.create(undefined);
  }

  private getMinimumProductionDays(type: Type): number {
    const minimumDays = {
      [Type.crops]: 7, // Cultivos: mínimo 7 dias
      [Type.livestock]: 30, // Gado: mínimo 30 dias
      [Type.dairy]: 1, // Lácteos: mínimo 1 dia
    };

    return minimumDays[type] || 7;
  }

  private getMaxSimultaneousProductions(type: Type): number {
    const maxSimultaneous = {
      [Type.crops]: 10, // Máximo 10 cultivos simultâneos
      [Type.livestock]: 5, // Máximo 5 criações simultâneas
      [Type.dairy]: 15, // Máximo 15 produções lácteas simultâneas
    };

    return maxSimultaneous[type] || 5;
  }

  /**
   * Análise de tendências de produção
   */
  public analyzeProductionTrends(productions: ProductionValueObject[]): string {
    if (productions.length < 3)
      return "Dados insuficientes para análise de tendências";

    const recentProductions = productions.filter(
      (prod) => prod.getProductionAge() <= 30
    );
    const olderProductions = productions.filter(
      (prod) => prod.getProductionAge() > 30
    );

    if (recentProductions.length === 0) return "Sem produções recentes";

    const recentCompletionRate =
      recentProductions.filter((prod) => prod.canBeHarvested()).length /
      recentProductions.length;
    const olderCompletionRate =
      olderProductions.length > 0
        ? olderProductions.filter((prod) => prod.canBeHarvested()).length /
          olderProductions.length
        : 0;

    if (recentCompletionRate > olderCompletionRate + 0.1)
      return "Melhoria na eficiência de produção";
    if (recentCompletionRate < olderCompletionRate - 0.1)
      return "Declínio na eficiência de produção";

    return "Eficiência de produção estável";
  }

  /**
   * Recomendações baseadas em análise
   */
  public getProductionRecommendations(
    productions: ProductionValueObject[]
  ): string[] {
    const recommendations: string[] = [];
    const metrics = this.calculateProductionMetrics(productions);

    // Recomendação sobre atrasos
    if (metrics.overdueCount > 0) {
      recommendations.push(
        `Atenção: ${metrics.overdueCount} produção(ões) em atraso. Revisar cronograma.`
      );
    }

    // Recomendação sobre eficiência
    if (metrics.efficiencyScore < 50) {
      recommendations.push(
        "Eficiência baixa. Considere revisar processos produtivos."
      );
    }

    // Recomendação sobre diversificação
    if (metrics.productionsByType.size === 1) {
      recommendations.push(
        "Considere diversificar tipos de produção para reduzir riscos."
      );
    }

    // Recomendação sobre volume
    if (metrics.totalProductions < 5) {
      recommendations.push(
        "Considere aumentar o volume de produções para otimizar recursos."
      );
    }

    return recommendations.length > 0
      ? recommendations
      : ["Produção em bom estado. Continue o trabalho!"];
  }
}
