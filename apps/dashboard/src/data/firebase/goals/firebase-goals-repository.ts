import { doc, Firestore, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../clientApp";
import Goal from "../../../domain/models/farm/goals/Goal";
import Goals from "../../../domain/models/farm/goals/Goals";
import { Type } from "../../../domain/models/farm/product/Type";
import Production from "../../../domain/models/farm/production/Production";
import SalesItem from "../../../domain/models/farm/sales/SalesItem";
import { GoalType } from "@repo/ui/dropdown";
import { GoalsRepository } from "../../../domain/repositories/goals-repository";
import {
  Result,
  Success,
  Failure,
  DatabaseError,
  ValidationError,
  NotFoundError,
} from "../../../domain/common/Result";

export class FirebaseGoalsRepository implements GoalsRepository {
  private db: Firestore;

  constructor(db: Firestore) {
    this.db = db;
  }
  async addGoalToUser(
    userId: string,
    newGoal: Goal,
    goalType: GoalType
  ): Promise<Result<boolean>> {
    if (!userId || !newGoal) {
      return Failure.create(
        new ValidationError("User ID e meta são obrigatórios")
      );
    }

    try {
      const userDocRef = doc(this.db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error("User document does not exist");
        return Failure.create(
          new NotFoundError("Documento do usuário não existe")
        );
      }

      const userData = userDocSnap.data();

      if (goalType === GoalType.production) {
        userData.goals.productionGoals = this.updateProductionGoal(
          userData.goals,
          newGoal,
          userData.production
        );
      } else {
        userData.goals.salesGoals = this.updateSalesGoal(
          userData.goals,
          newGoal,
          userData.sales
        );
      }

      await setDoc(userDocRef, userData, { merge: true });
      return Success.create(true);
    } catch (error) {
      console.error("Error adding goal to user:", error);
      return Failure.create(
        new DatabaseError(`Erro ao adicionar meta: ${error}`)
      );
    }
  }

  updateProductionGoal = (
    goals: Goals,
    newGoal: Goal,
    production: Production[]
  ) => {
    if (
      goals.productionGoals.some(
        (currentGoal: Goal) => currentGoal.type === newGoal.type
      )
    ) {
      return goals.productionGoals.map((currentGoal: Goal) => {
        if (currentGoal.type === newGoal.type) {
          return {
            ...newGoal,
            current: this.getCurrentProductionValue(production, newGoal.type),
          };
        }
        return currentGoal;
      });
    } else {
      goals.productionGoals.push({
        ...newGoal,
        current: this.getCurrentProductionValue(production, newGoal.type),
      });
      return goals.productionGoals;
    }
  };

  getCurrentProductionValue = (production: Production[], type: Type) => {
    const currentProduction = production.filter(
      (prod: Production) => prod.product.type === type
    );

    if (currentProduction.length === 0) {
      return 0;
    }

    return currentProduction.reduce((total: number, prod: Production) => {
      if (prod.status === "done") {
        return total + prod.quantity;
      }
      return total;
    }, 0);
  };

  updateSalesGoal = (goals: Goals, newGoal: Goal, sales: SalesItem[]) => {
    if (
      goals.salesGoals.some(
        (currentGoal: Goal) => currentGoal.type === newGoal.type
      )
    ) {
      return goals.salesGoals.map((currentGoal: Goal) => {
        if (currentGoal.type === newGoal.type) {
          return {
            ...newGoal,
            current: this.getCurrentSalesValue(sales, newGoal.type),
          };
        }
        return currentGoal;
      });
    } else {
      goals.salesGoals.push({
        ...newGoal,
        current: this.getCurrentSalesValue(sales, newGoal.type),
      });
      return goals.salesGoals;
    }
  };

  getCurrentSalesValue = (sales: SalesItem[], type: Type) => {
    const currentSales = sales.filter(
      (sale: SalesItem) => sale.product.type === type
    );

    if (currentSales.length === 0) {
      return 0;
    }

    return currentSales.reduce(
      (total: number, sale: SalesItem) => total + sale.income,
      0
    );
  };
}

export const firebaseGoalsRepository = new FirebaseGoalsRepository(db);
