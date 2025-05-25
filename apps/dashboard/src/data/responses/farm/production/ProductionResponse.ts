import ProductResponse from "../product/ProductResponse";
import Product from "../product/ProductResponse";

export default interface ProductionResponse {
  product: ProductResponse;
  quantity: number;
  status: string;
}
