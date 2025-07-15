import { firebaseProductionRepository } from "../../../../data/firebase/production/firebase-production-repository";
import Production from "../../../models/farm/production/Production";
import { ProductionRepository } from "../../../repositories/production-repository";
import { AddProductionUseCase } from "./AddProductionUseCase";
import {
  Result,
  ValidationError,
  Failure,
  Success,
} from "../../../common/Result";
import { ProductionValueObject } from "../../../valueObjects/ProductionValueObject";
import { ProductValueObject } from "../../../valueObjects/ProductValueObject";
import { ProductionBusinessService } from "../../../services/ProductionBusinessService";
import { UserRepository } from "../../../repositories/user-repository";

export class AddProductionUseCaseImpl implements AddProductionUseCase {
  private productionBusinessService: ProductionBusinessService;

  constructor(
    private productionRepository: ProductionRepository,
    private userRepository?: UserRepository,
    productionBusinessService?: ProductionBusinessService
  ) {
    this.productionBusinessService =
      productionBusinessService || new ProductionBusinessService();
  }

  async execute(
    userId: string,
    production: Production
  ): Promise<Result<boolean>> {
    // Validação básica de entrada
    const inputValidation = this.validateInput(userId, production);
    if (inputValidation.isFailure) {
      return Failure.create(inputValidation.error);
    }

    // Converter para Value Object para aplicar validações de domínio
    const productionValueObjectResult =
      this.createProductionValueObject(production);
    if (productionValueObjectResult.isFailure) {
      return Failure.create(productionValueObjectResult.error);
    }

    const productionVO = productionValueObjectResult.value;

    // Verificar se a produção pode ser iniciada
    const canStartValidation =
      this.productionBusinessService.canStartProduction(productionVO);
    if (canStartValidation.isFailure) {
      return Failure.create(canStartValidation.error);
    }

    // Verificar conflitos de recursos se tivermos acesso ao repositório do usuário
    if (this.userRepository) {
      const conflictValidation = await this.checkResourceConflicts(
        userId,
        productionVO
      );
      if (conflictValidation.isFailure) {
        return Failure.create(conflictValidation.error);
      }
    }

    // Converter de volta para interface legacy para persistência
    const legacyProduction = productionVO.toProduction();

    // Persistir no repositório
    return this.productionRepository.addProductionToUser(
      userId,
      legacyProduction
    );
  }

  /**
   * Validações de entrada mais robustas
   */
  private validateInput(userId: string, production: Production): Result<void> {
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

    // Validação dos dados de produção
    if (!production) {
      return Failure.create(
        new ValidationError("Dados de produção são obrigatórios")
      );
    }

    if (!production.product) {
      return Failure.create(new ValidationError("Produto é obrigatório"));
    }

    if (typeof production.quantity !== "number") {
      return Failure.create(
        new ValidationError("Quantidade deve ser um número")
      );
    }

    if (!production.status) {
      return Failure.create(
        new ValidationError("Status da produção é obrigatório")
      );
    }

    return Success.create(undefined);
  }

  /**
   * Converte Production legacy para Value Object
   */
  private createProductionValueObject(
    production: Production
  ): Result<ProductionValueObject> {
    const productResult = ProductValueObject.create(
      production.product.name,
      production.product.type,
      production.product.unitValue
    );

    if (productResult.isFailure) {
      return Failure.create(productResult.error);
    }

    return ProductionValueObject.create(
      productResult.value,
      production.quantity,
      production.status
    );
  }

  /**
   * Verifica conflitos de recursos obtendo produções existentes do usuário
   */
  private async checkResourceConflicts(
    userId: string,
    newProduction: ProductionValueObject
  ): Result<void> {
    try {
      const userResult = await this.userRepository!.getUserByUid(userId);

      if (userResult.isFailure) {
        // Se não conseguir obter o usuário, prossegue sem verificação de conflitos
        // Isso evita bloquear a operação por problemas de infraestrutura
        return Success.create(undefined);
      }

      const user = userResult.value;

      // Converter produções existentes para Value Objects
      const existingProductionsVOs: ProductionValueObject[] = [];

      for (const production of user.production) {
        const productionVOResult = this.createProductionValueObject(production);
        if (productionVOResult.isSuccess) {
          existingProductionsVOs.push(productionVOResult.value);
        }
      }

      // Verificar conflitos usando o Domain Service
      return this.productionBusinessService.checkResourceConflicts(
        newProduction,
        existingProductionsVOs
      );
    } catch (error) {
      // Em caso de erro, não bloqueia a operação
      console.warn("Não foi possível verificar conflitos de recursos:", error);
      return Success.create(undefined);
    }
  }
}

export const addProductionUseCaseImpl = new AddProductionUseCaseImpl(
  firebaseProductionRepository
);
