import Product from "../product/Product";

export default interface SalesItem {
  product: Product;
  quantity: number;
  income: number;
}
export function createSalesItem(product: Product, quantity: number): SalesItem {
  let income = product.unitValue * quantity;
  let salesItem = {
    product,
    quantity: Number(quantity),
    income,
  };
  return salesItem;
}
