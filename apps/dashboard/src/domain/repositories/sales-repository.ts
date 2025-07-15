import SalesItem from "../models/farm/sales/SalesItem";

export interface SalesRepository {
  addSalesToUser(userId: string, salesItem: SalesItem): Promise<boolean>;
}
