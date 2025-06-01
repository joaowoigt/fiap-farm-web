import Production from "../../../models/farm/production/Production";

export interface AddProductionUseCase {
  execute: (userId: string, production: Production) => Promise<boolean>;
}
