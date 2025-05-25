import Product from "../product/Product";
import { Status } from "./Status";

export default interface Production {
  product: Product;
  quantity: number;
  status: Status;
}
