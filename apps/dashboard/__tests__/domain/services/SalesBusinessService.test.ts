/**
 * Testes para SalesBusinessService
 * Verifica regras de negócio complexas relacionadas a vendas
 */

import { SalesBusinessService } from "../../../src/domain/services/SalesBusinessService";
import { SalesItemValueObject } from "../../../src/domain/valueObjects/SalesItemValueObject";
import { ProductValueObject } from "../../../src/domain/valueObjects/ProductValueObject";
import { Type } from "../../../src/domain/models/farm/product/Type";

describe("SalesBusinessService", () => {
  let service: SalesBusinessService;
  let tomatoProduct: ProductValueObject;
  let milkProduct: ProductValueObject;
  let livestockProduct: ProductValueObject;

  beforeEach(() => {
    service = new SalesBusinessService();

    tomatoProduct = ProductValueObject.create("Tomate", Type.crops, 5.5).value;
    milkProduct = ProductValueObject.create("Leite", Type.dairy, 4.2).value;
    livestockProduct = ProductValueObject.create(
      "Boi",
      Type.livestock,
      2500.0
    ).value;
  });

  describe("Validação de vendas", () => {
    test("deve aceitar venda válida de cultivos", () => {
      const salesItem = SalesItemValueObject.create(tomatoProduct, 100).value;
      const result = service.validateSale(salesItem);

      expect(result.isSuccess).toBe(true);
    });

    test("deve rejeitar venda de lácteos muito antiga", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 10); // 10 dias atrás

      const salesItem = SalesItemValueObject.create(
        milkProduct,
        50,
        oldDate
      ).value;
      const result = service.validateSale(salesItem);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain(
        "produtos lácteos devem ser registradas em até 7 dias"
      );
    });

    test("deve aceitar venda de lácteos recente", () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 3); // 3 dias atrás

      const salesItem = SalesItemValueObject.create(
        milkProduct,
        50,
        recentDate
      ).value;
      const result = service.validateSale(salesItem);

      expect(result.isSuccess).toBe(true);
    });

    test("deve rejeitar vendas muito altas", () => {
      // Venda de R$ 25.000 (10 bois)
      const salesItem = SalesItemValueObject.create(livestockProduct, 10).value;
      const result = service.validateSale(salesItem);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain(
        "acima de R$ 10.000 requerem aprovação"
      );
    });
    test("deve rejeitar quantidade excessiva para o tipo", () => {
      // Criar produto com valor baixo para testar apenas limite de quantidade
      const cheapLivestockProduct = ProductValueObject.create(
        "Galinha",
        Type.livestock,
        15.0
      ).value;
      const salesItem = SalesItemValueObject.create(
        cheapLivestockProduct,
        600
      ).value;
      const result = service.validateSale(salesItem);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain(
        "Quantidade máxima para livestock é 500"
      );
    });
  });

  describe("Desconto por volume", () => {
    test("deve aplicar desconto de 10% para 1000+ unidades", () => {
      const salesItem = SalesItemValueObject.create(tomatoProduct, 1000).value;
      const result = service.applyVolumeDiscount(salesItem);

      expect(result.isSuccess).toBe(true);

      // Valor original: 5.50 * 1000 = 5500
      // Valor com desconto: 4.95 * 1000 = 4950
      expect(result.value.income).toBe(4950);
    });

    test("deve aplicar desconto de 5% para 500+ unidades", () => {
      const salesItem = SalesItemValueObject.create(tomatoProduct, 500).value;
      const result = service.applyVolumeDiscount(salesItem);

      expect(result.isSuccess).toBe(true);
      // Valor original: 5.50 * 500 = 2750
      // Valor com desconto: 5.23 * 500 = 2615 (arredondado para 2 casas decimais)
      expect(result.value.income).toBe(2615);
    });

    test("deve aplicar desconto de 2% para 100+ unidades", () => {
      const salesItem = SalesItemValueObject.create(tomatoProduct, 100).value;
      const result = service.applyVolumeDiscount(salesItem);

      expect(result.isSuccess).toBe(true);

      // Valor original: 5.50 * 100 = 550
      // Valor com desconto: 5.39 * 100 = 539
      expect(result.value.income).toBe(539);
    });

    test("não deve aplicar desconto para menos de 100 unidades", () => {
      const salesItem = SalesItemValueObject.create(tomatoProduct, 50).value;
      const result = service.applyVolumeDiscount(salesItem);

      expect(result.isSuccess).toBe(true);
      expect(result.value.income).toBe(275); // 5.50 * 50, sem desconto
    });
  });

  describe("Combinação de vendas", () => {
    test("deve permitir combinar vendas do mesmo produto no mesmo dia", () => {
      const today = new Date();
      const sale1 = SalesItemValueObject.create(tomatoProduct, 50, today).value;
      const sale2 = SalesItemValueObject.create(tomatoProduct, 30, today).value;

      const canCombine = service.canCombineSales(sale1, sale2);
      expect(canCombine).toBe(true);
    });

    test("não deve permitir combinar vendas de produtos diferentes", () => {
      const today = new Date();
      const sale1 = SalesItemValueObject.create(tomatoProduct, 50, today).value;
      const sale2 = SalesItemValueObject.create(milkProduct, 30, today).value;

      const canCombine = service.canCombineSales(sale1, sale2);
      expect(canCombine).toBe(false);
    });

    test("não deve permitir combinar vendas de dias diferentes", () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 2);

      const sale1 = SalesItemValueObject.create(tomatoProduct, 50, today).value;
      const sale2 = SalesItemValueObject.create(
        tomatoProduct,
        30,
        yesterday
      ).value;

      const canCombine = service.canCombineSales(sale1, sale2);
      expect(canCombine).toBe(false);
    });

    test("deve combinar vendas corretamente", () => {
      const today = new Date();
      const sale1 = SalesItemValueObject.create(tomatoProduct, 50, today).value;
      const sale2 = SalesItemValueObject.create(tomatoProduct, 30, today).value;

      const result = service.combineSales(sale1, sale2);

      expect(result.isSuccess).toBe(true);
      expect(result.value.quantity).toBe(80);
      expect(result.value.income).toBe(440); // 5.50 * 80
    });
  });

  describe("Cálculo de métricas", () => {
    test("deve calcular métricas para lista vazia", () => {
      const metrics = service.calculateSalesMetrics([]);

      expect(metrics.totalRevenue).toBe(0);
      expect(metrics.averageSaleValue).toBe(0);
      expect(metrics.bestSellingProductType).toBeNull();
      expect(metrics.highValueSalesCount).toBe(0);
    });

    test("deve calcular métricas corretamente", () => {
      const sales = [
        SalesItemValueObject.create(tomatoProduct, 100).value, // R$ 550
        SalesItemValueObject.create(milkProduct, 200).value, // R$ 840
        SalesItemValueObject.create(livestockProduct, 2).value, // R$ 5000
      ];

      const metrics = service.calculateSalesMetrics(sales);

      expect(metrics.totalRevenue).toBe(6390); // 550 + 840 + 5000
      expect(metrics.averageSaleValue).toBe(2130); // 6390 / 3
      expect(metrics.bestSellingProductType).toBe(Type.livestock); // R$ 5000
      expect(metrics.highValueSalesCount).toBe(1); // Apenas livestock >= R$ 1000
      expect(metrics.salesByType.get(Type.crops)).toBe(550);
      expect(metrics.salesByType.get(Type.dairy)).toBe(840);
      expect(metrics.salesByType.get(Type.livestock)).toBe(5000);
    });

    test("deve identificar vendas de alto valor", () => {
      const sales = [
        SalesItemValueObject.create(tomatoProduct, 100).value, // R$ 550 - não é alto valor
        SalesItemValueObject.create(tomatoProduct, 200).value, // R$ 1100 - é alto valor
        SalesItemValueObject.create(livestockProduct, 2).value, // R$ 5000 - é alto valor
      ];

      const metrics = service.calculateSalesMetrics(sales);
      expect(metrics.highValueSalesCount).toBe(2);
    });
  });

  describe("Análise de tendências", () => {
    test("deve identificar melhoria na performance", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 45);

      const sales = [
        // Vendas antigas (menor valor)
        SalesItemValueObject.create(tomatoProduct, 50, oldDate).value,

        // Vendas recentes (maior valor)
        SalesItemValueObject.create(tomatoProduct, 200).value,
        SalesItemValueObject.create(milkProduct, 100).value,
      ];

      const trend = service.analyzeSalesTrend(sales);
      expect(trend).toContain("crescimento");
    });

    test("deve identificar declínio na performance", () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 45);

      const sales = [
        // Vendas antigas (maior valor)
        SalesItemValueObject.create(livestockProduct, 3, oldDate).value,

        // Vendas recentes (menor valor)
        SalesItemValueObject.create(tomatoProduct, 50).value,
      ];

      const trend = service.analyzeSalesTrend(sales);
      expect(trend).toContain("declínio");
    });

    test("deve lidar com dados insuficientes", () => {
      const sales = [SalesItemValueObject.create(tomatoProduct, 50).value];

      const trend = service.analyzeSalesTrend(sales);
      expect(trend).toContain("Dados insuficientes");
    });
  });
});
