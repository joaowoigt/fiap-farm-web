import Production from "../../../models/farm/production/Production";
import { Result } from "../../../common/Result";

export interface AddProductionUseCase {
  execute: (userId: string, production: Production) => Promise<Result<boolean>>;
}
