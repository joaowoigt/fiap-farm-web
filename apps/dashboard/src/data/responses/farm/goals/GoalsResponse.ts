import { ProductionGoalResponse } from "./ProductionGoalResponse";
import SalesGoalResponse from "./SalesGoalResponse";

export default interface GoalsResponse {
  productionGoals: ProductionGoalResponse[];
  salesGoals: SalesGoalResponse[];
}
