import ProductResponse from "../product/ProductResponse";

export default interface SalesItemResponse {
  product: ProductResponse;
  quantity: number;
}
