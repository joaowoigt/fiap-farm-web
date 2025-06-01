import Product from "../product/Product";
import { Status } from "./Status";

export default interface Production {
  product: Product;
  quantity: number;
  status: Status;
}

export function getAllAvailableProducts(productions: Production[]): Product[] {
  let allProducts: Product[] = [];

  productions.forEach((production) => {
    allProducts.push(production.product);
  });

  return allProducts;
}
