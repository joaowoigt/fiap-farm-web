/**
 * Domain enum for Goal Types
 * Decoupled from UI components following Clean Architecture principles
 */
export enum GoalType {
  production = "production",
  sales = "sales",
  revenue = "revenue",
  efficiency = "efficiency",
}

export const getGoalTypeFromDb = (type: string): GoalType => {
  switch (type) {
    case "production":
      return GoalType.production;
    case "sales":
      return GoalType.sales;
    case "revenue":
      return GoalType.revenue;
    case "efficiency":
      return GoalType.efficiency;
    default:
      throw new Error(`Invalid goal type: ${type}`);
  }
};

export const getGoalTypeFromUi = (type: string): GoalType => {
  switch (type) {
    case "production":
      return GoalType.production;
    case "sales":
      return GoalType.sales;
    case "revenue":
      return GoalType.revenue;
    case "efficiency":
      return GoalType.efficiency;
    default:
      throw new Error(`Invalid goal type: ${type}`);
  }
};
