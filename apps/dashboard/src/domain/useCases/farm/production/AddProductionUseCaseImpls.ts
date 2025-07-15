import { firebaseProductionRepository } from "../../../../data/firebase/production/firebase-production-repository";
import Production from "../../../models/farm/production/Production";
import { ProductionRepository } from "../../../repositories/production-repository";
import { AddProductionUseCase } from "./AddProductionUseCase";

export class AddProductionUseCaseImpl implements AddProductionUseCase {
  constructor(private productionRepository: ProductionRepository) {
    this.productionRepository = productionRepository;
  }

  async execute(userId: string, production: Production): Promise<boolean> {
    return this.productionRepository.addProductionToUser(userId, production);
  }
}

export const addProductionUseCaseImpl = new AddProductionUseCaseImpl(
  firebaseProductionRepository
);
