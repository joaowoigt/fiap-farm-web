import Goals from "../goals/Goals";
import Production from "../production/Production";
import SalesItem from "../sales/SalesItem";

export default interface User {
  sales: SalesItem[];
  production: Production[];
  goals: Goals;
}
