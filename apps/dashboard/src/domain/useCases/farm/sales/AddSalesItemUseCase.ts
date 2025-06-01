import Product from "../../../models/farm/product/Product";
import SalesItem from "../../../models/farm/sales/SalesItem";

export interface AddSalesItemUseCase {
  execute: (userId: string, salesItem: SalesItem) => Promise<boolean>;
}
