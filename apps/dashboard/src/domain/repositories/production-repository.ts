import Production from "../models/farm/production/Production";

export interface ProductionRepository {
  addProductionToUser(userId: string, production: Production): Promise<boolean>;
}
