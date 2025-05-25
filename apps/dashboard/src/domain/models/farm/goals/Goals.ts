import ProductionGoal from "./ProductionGoal";
import SalesGoal from "./SalesGoal";

export default interface Goals {
  productionGoals: ProductionGoal[];
  salesGoals: SalesGoal[];
}
