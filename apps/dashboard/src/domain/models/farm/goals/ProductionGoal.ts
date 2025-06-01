import { Type } from "../product/Type";

export default interface Goal {
  type: Type;
  goal: number;
  current: number;
}
