import { BackIcon, NextIcon } from "@repo/ui/icons";
import { Transaction } from "../../../domain/models/Transaction";
import {
  setCurrentPage,
  setExtract,
} from "../../features/transactions/transactionsSlices";
import ExtractItem from "./ExtractItem";
import { useDispatch, useSelector } from "react-redux";

export default function ExtractList() {
  const dispatch = useDispatch();
  const transactions: Transaction[] = useSelector(
    (state: any) => state.transactions.filteredList
  );
  const currentPage: number = useSelector(
    (state: any) => state.transactions.pagination.currentPage
  );
  const totalPage: number = useSelector(
    (state: any) => state.transactions.pagination.totalPages
  );
  const filter: String = useSelector((state: any) => state.transactions.filter);

  const handleBackAction = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(setExtract());
  };

  const handleNextAction = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(setExtract());
  };

  return (
    <div>
      {transactions.map((item) => (
        <ExtractItem
          key={item.id}
          _id={item.id}
          month={item.month}
          type={item.type}
          fullDate={item.fullDate}
          value={item.value.toString()}
        ></ExtractItem>
      ))}
      {filter === "All" ? (
        <div className="flex flex-row mt-10 justify-between">
          {currentPage <= 1 ? (
            <div></div>
          ) : (
            <BackIcon onClick={() => handleBackAction()}></BackIcon>
          )}

          {currentPage == totalPage ? (
            <div></div>
          ) : (
            <NextIcon onClick={() => handleNextAction()}></NextIcon>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
