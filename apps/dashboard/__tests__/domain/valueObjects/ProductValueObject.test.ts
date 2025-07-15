/**
 * Testes para ProductValueObject
 * Verifica todas as validações de domínio e regras de negócio
 */

import { ProductValueObject } from "../../../src/domain/valueObjects/ProductValueObject";
import { Type } from "../../../src/domain/models/farm/product/Type";

describe("ProductValueObject", () => {
  describe("Criação de produto válido", () => {
    test("deve criar produto com dados válidos", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, 5.5);

      expect(result.isSuccess).toBe(true);
      expect(result.value.name).toBe("Tomate");
      expect(result.value.type).toBe(Type.crops);
      expect(result.value.unitValue).toBe(5.5);
    });

    test("deve criar produto de gado", () => {
      const result = ProductValueObject.create(
        "Boi Nelore",
        Type.livestock,
        2500.0
      );

      expect(result.isSuccess).toBe(true);
      expect(result.value.type).toBe(Type.livestock);
    });

    test("deve criar produto lácteo", () => {
      const result = ProductValueObject.create(
        "Leite Integral",
        Type.dairy,
        4.2
      );

      expect(result.isSuccess).toBe(true);
      expect(result.value.type).toBe(Type.dairy);
    });
  });

  describe("Validação de nome", () => {
    test("deve falhar com nome vazio", () => {
      const result = ProductValueObject.create("", Type.crops, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Nome do produto é obrigatório");
    });

    test("deve falhar com nome muito curto", () => {
      const result = ProductValueObject.create("A", Type.crops, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("pelo menos 2 caracteres");
    });

    test("deve falhar com nome muito longo", () => {
      const longName = "A".repeat(101);
      const result = ProductValueObject.create(longName, Type.crops, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("não pode exceder 100 caracteres");
    });

    test("deve falhar com caracteres especiais inválidos", () => {
      const result = ProductValueObject.create("Tomate@#$", Type.crops, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("caracteres inválidos");
    });

    test("deve aceitar espaços e hífens no nome", () => {
      const result = ProductValueObject.create(
        "Tomate-Cereja Orgânico",
        Type.crops,
        5.5
      );

      expect(result.isSuccess).toBe(true);
    });
  });

  describe("Validação de tipo", () => {
    test("deve falhar com tipo nulo", () => {
      const result = ProductValueObject.create("Tomate", null as any, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Tipo do produto é obrigatório");
    });

    test("deve falhar com tipo inválido", () => {
      const result = ProductValueObject.create("Tomate", "invalid" as any, 5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Tipo do produto inválido");
    });
  });

  describe("Validação de valor unitário", () => {
    test("deve falhar com valor zero", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, 0);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("deve ser positivo");
    });

    test("deve falhar com valor negativo", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, -5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("deve ser positivo");
    });

    test("deve falhar com valor muito alto", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, 1000001);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("não pode exceder R$ 1.000.000");
    });

    test("deve falhar com muitas casas decimais", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, 5.123);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("no máximo 2 casas decimais");
    });

    test("deve aceitar valor com 2 casas decimais", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, 5.5);

      expect(result.isSuccess).toBe(true);
    });

    test("deve falhar com NaN", () => {
      const result = ProductValueObject.create("Tomate", Type.crops, NaN);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("número válido");
    });
  });

  describe("Métodos de domínio", () => {
    let product: ProductValueObject;

    beforeEach(() => {
      const result = ProductValueObject.create("Tomate", Type.crops, 5.5);
      product = result.value;
    });

    test("deve calcular valor total corretamente", () => {
      const result = product.calculateTotalValue(10);

      expect(result.isSuccess).toBe(true);
      expect(result.value).toBe(55.0);
    });

    test("deve falhar ao calcular valor com quantidade inválida", () => {
      const result = product.calculateTotalValue(-5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("Quantidade deve ser positiva");
    });

    test("deve falhar com quantidade não inteira", () => {
      const result = product.calculateTotalValue(5.5);

      expect(result.isFailure).toBe(true);
      expect(result.error.message).toContain("número inteiro");
    });

    test("deve verificar tipo corretamente", () => {
      expect(product.isOfType(Type.crops)).toBe(true);
      expect(product.isOfType(Type.livestock)).toBe(false);
      expect(product.isOfType(Type.dairy)).toBe(false);
    });

    test("deve formatar preço corretamente", () => {
      const formatted = product.formatPrice();

      expect(formatted).toContain("R$");
      expect(formatted).toContain("5,50");
    });
  });

  describe("Igualdade", () => {
    test("deve ser igual a produtos com mesmos valores", () => {
      const product1 = ProductValueObject.create(
        "Tomate",
        Type.crops,
        5.5
      ).value;
      const product2 = ProductValueObject.create(
        "Tomate",
        Type.crops,
        5.5
      ).value;

      expect(product1.equals(product2)).toBe(true);
    });

    test("deve ser diferente com nomes diferentes", () => {
      const product1 = ProductValueObject.create(
        "Tomate",
        Type.crops,
        5.5
      ).value;
      const product2 = ProductValueObject.create(
        "Alface",
        Type.crops,
        5.5
      ).value;

      expect(product1.equals(product2)).toBe(false);
    });

    test("deve ser diferente com tipos diferentes", () => {
      const product1 = ProductValueObject.create(
        "Produto",
        Type.crops,
        5.5
      ).value;
      const product2 = ProductValueObject.create(
        "Produto",
        Type.dairy,
        5.5
      ).value;

      expect(product1.equals(product2)).toBe(false);
    });

    test("deve ser diferente com valores diferentes", () => {
      const product1 = ProductValueObject.create(
        "Tomate",
        Type.crops,
        5.5
      ).value;
      const product2 = ProductValueObject.create(
        "Tomate",
        Type.crops,
        6.0
      ).value;

      expect(product1.equals(product2)).toBe(false);
    });
  });

  describe("Conversão para interface legacy", () => {
    test("deve converter corretamente", () => {
      const productVO = ProductValueObject.create(
        "Tomate",
        Type.crops,
        5.5
      ).value;
      const legacyProduct = productVO.toProduct();

      expect(legacyProduct).toEqual({
        name: "Tomate",
        type: Type.crops,
        unitValue: 5.5,
      });
    });
  });
});
