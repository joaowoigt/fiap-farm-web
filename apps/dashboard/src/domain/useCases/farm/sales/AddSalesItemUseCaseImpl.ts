import { firebaseSalesRepository } from "../../../../data/firebase/sales/firebase-sales-repository";
import Product from "../../../models/farm/product/Product";
import SalesItem, {
  createSalesItem,
} from "../../../models/farm/sales/SalesItem";
import { SalesRepository } from "../../../repositories/sales-repository";
import { AddSalesItemUseCase } from "./AddSalesItemUseCase";
import {
  Result,
  ValidationError,
  Failure,
  Success,
} from "../../../common/Result";
import { SalesItemValueObject } from "../../../valueObjects/SalesItemValueObject";
import { ProductValueObject } from "../../../valueObjects/ProductValueObject";
import { SalesBusinessService } from "../../../services/SalesBusinessService";

export class AddSalesItemUseCaseImpl implements AddSalesItemUseCase {
  private salesBusinessService: SalesBusinessService;

  constructor(
    private salesRepository: SalesRepository,
    salesBusinessService?: SalesBusinessService
  ) {
    this.salesBusinessService =
      salesBusinessService || new SalesBusinessService();
  }
  async execute(
    userId: string,
    salesItem: SalesItem
  ): Promise<Result<boolean>> {
    // Validação básica de entrada
    const inputValidation = this.validateInput(userId, salesItem);
    if (inputValidation.isFailure) {
      return Failure.create(inputValidation.error);
    }

    // Converter para Value Object para aplicar validações de domínio
    const salesItemValueObjectResult =
      this.createSalesItemValueObject(salesItem);
    if (salesItemValueObjectResult.isFailure) {
      return Failure.create(salesItemValueObjectResult.error);
    }

    const salesItemVO = salesItemValueObjectResult.value;

    // Aplicar regras de negócio através do Domain Service
    const businessValidation =
      this.salesBusinessService.validateSale(salesItemVO);
    if (businessValidation.isFailure) {
      return Failure.create(businessValidation.error);
    }

    // Aplicar desconto por volume se aplicável
    const salesItemWithDiscountResult =
      this.salesBusinessService.applyVolumeDiscount(salesItemVO);
    if (salesItemWithDiscountResult.isFailure) {
      return Failure.create(salesItemWithDiscountResult.error);
    }

    const finalSalesItem = salesItemWithDiscountResult.value;

    // Converter de volta para interface legacy para persistência
    const legacySalesItem = finalSalesItem.toSalesItem();

    // Persistir no repositório
    return this.salesRepository.addSalesToUser(userId, legacySalesItem);
  }

  /**
   * Validações de entrada mais robustas
   */
  private validateInput(userId: string, salesItem: SalesItem): Result<void> {
    // Validação do ID do usuário
    if (!userId || typeof userId !== "string") {
      return Failure.create(new ValidationError("ID do usuário é obrigatório"));
    }

    if (userId.trim().length === 0) {
      return Failure.create(
        new ValidationError("ID do usuário não pode estar vazio")
      );
    }

    if (userId.length < 10) {
      return Failure.create(new ValidationError("ID do usuário inválido"));
    }

    // Validação do item de venda
    if (!salesItem) {
      return Failure.create(
        new ValidationError("Dados do item de venda são obrigatórios")
      );
    }

    if (!salesItem.product) {
      return Failure.create(new ValidationError("Produto é obrigatório"));
    }

    if (typeof salesItem.quantity !== "number") {
      return Failure.create(
        new ValidationError("Quantidade deve ser um número")
      );
    }

    return Success.create(undefined);
  }

  /**
   * Converte SalesItem legacy para Value Object
   */
  private createSalesItemValueObject(
    salesItem: SalesItem
  ): Result<SalesItemValueObject> {
    const productResult = ProductValueObject.create(
      salesItem.product.name,
      salesItem.product.type,
      salesItem.product.unitValue
    );

    if (productResult.isFailure) {
      return Failure.create(productResult.error);
    }

    return SalesItemValueObject.create(productResult.value, salesItem.quantity);
  }
}

export const addSalesItemUseCaseImpl = new AddSalesItemUseCaseImpl(
  firebaseSalesRepository
);
