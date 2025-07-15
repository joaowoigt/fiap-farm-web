import Product from "../../../models/farm/product/Product";
import SalesItem from "../../../models/farm/sales/SalesItem";
import { Result } from "../../../common/Result";

export interface AddSalesItemUseCase {
  execute: (userId: string, salesItem: SalesItem) => Promise<Result<boolean>>;
}
