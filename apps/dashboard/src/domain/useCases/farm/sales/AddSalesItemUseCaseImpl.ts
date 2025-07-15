import { firebaseSalesRepository } from "../../../../data/firebase/sales/firebase-sales-repository";
import Product from "../../../models/farm/product/Product";
import SalesItem, {
  createSalesItem,
} from "../../../models/farm/sales/SalesItem";
import { SalesRepository } from "../../../repositories/sales-repository";
import { AddSalesItemUseCase } from "./AddSalesItemUseCase";

export class AddSalesItemUseCaseImpl implements AddSalesItemUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute(userId: string, salesItem: SalesItem): Promise<boolean> {
    return this.salesRepository.addSalesToUser(userId, salesItem);
  }
}

export const addSalesItemUseCaseImpl = new AddSalesItemUseCaseImpl(
  firebaseSalesRepository
);
