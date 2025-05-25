import ProductionGoalResponse from "../../../data/responses/farm/goals/ProductionGoalResponse";
import SalesGoalResponse from "../../../data/responses/farm/goals/SalesGoalResponse";
import ProductResponse from "../../../data/responses/farm/product/ProductResponse";
import ProductionResponse from "../../../data/responses/farm/production/ProductionResponse";
import SalesItemResponse from "../../../data/responses/farm/sales/SalesItemResponse";
import UserResponse from "../../../data/responses/farm/user/UserResponse";
import ProductionGoal from "../../models/farm/goals/ProductionGoal";
import SalesGoal from "../../models/farm/goals/SalesGoal";
import Product from "../../models/farm/product/Product";
import { getTypeFromDb } from "../../models/farm/product/Type";
import Production from "../../models/farm/production/Production";
import { getStatusFromDb } from "../../models/farm/production/Status";
import SalesItem from "../../models/farm/sales/SalesItem";
import User from "../../models/farm/user/User";

export function mapProduct(productResponse: ProductResponse): Product {
  return {
    name: productResponse.name,
    type: getTypeFromDb(productResponse.type),
    unitValue: productResponse.unitValue,
  };
}

export function mapProduction(
  productionResponse: ProductionResponse
): Production {
  return {
    product: mapProduct(productionResponse.product),
    quantity: productionResponse.quantity,
    status: getStatusFromDb(productionResponse.status),
  };
}

export function mapSales(salesResponse: SalesItemResponse): SalesItem {
  return {
    product: mapProduct(salesResponse.product),
    quantity: salesResponse.quantity,
  };
}

export function mapProductionGoal(
  productionGoalResponse: ProductionGoalResponse
): ProductionGoal {
  return {
    type: getTypeFromDb(productionGoalResponse.type),
    quantity: productionGoalResponse.quantity,
  };
}

export function mapSalesGoal(salesGoalResponse: SalesGoalResponse): SalesGoal {
  return {
    type: getTypeFromDb(salesGoalResponse.type),
    income: salesGoalResponse.income,
  };
}

export function mapUser(userResponse: UserResponse): User {
  return {
    sales: userResponse.sales.map(mapSales),
    production: userResponse.production.map(mapProduction),
    goals: {
      productionGoals:
        userResponse.goals.productionGoals.map(mapProductionGoal),
      salesGoals: userResponse.goals.salesGoals.map(mapSalesGoal),
    },
  };
}
