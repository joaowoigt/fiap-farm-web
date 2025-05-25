import GoalsResponse from "../goals/GoalsResponse";
import ProductionResponse from "../production/ProductionResponse";
import SalesItemResponse from "../sales/SalesItemResponse";

export default interface UserResponse {
  sales: SalesItemResponse[];
  production: ProductionResponse[];
  goals: GoalsResponse;
}
