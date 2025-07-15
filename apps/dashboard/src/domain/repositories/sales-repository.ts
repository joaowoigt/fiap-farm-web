import SalesItem from "../models/farm/sales/SalesItem";
import { Result } from "../common/Result";

export interface SalesRepository {
  addSalesToUser(
    userId: string,
    salesItem: SalesItem,
  ): Promise<Result<boolean>>;
}
