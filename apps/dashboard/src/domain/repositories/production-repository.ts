import Production from "../models/farm/production/Production";
import { Result } from "../common/Result";

export interface ProductionRepository {
  addProductionToUser(
    userId: string,
    production: Production
  ): Promise<Result<boolean>>;
}
