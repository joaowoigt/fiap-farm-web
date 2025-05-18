import { Text } from "@repo/ui/texts";
import ExtractList from "./ExtractList";
import { FilterDropdown, FilterTypes } from "@repo/ui/filterdropdown";
import { useDispatch } from "react-redux";
import {
  setExtract,
  setFilter,
} from "../../features/transactions/transactionsSlices";

export default function DashboardExtractArea(): JSX.Element {
  const dispatch = useDispatch();
  const handleFilter = (item: FilterTypes) => {
    dispatch(setFilter(item));
    dispatch(setExtract());
  };

  return (
    <div className="h-fit bg-grey w-[280px] flex flex-col py-[37px] px-big rounded-2xl mobile:items-center mobile:mt-big mobile:w-[312px] mobile:m-big mobile:px-0">
      <Text intent="Heading" color="black" text="Extrato" style="bold"></Text>
      <FilterDropdown
        onSelect={(item: FilterTypes) => handleFilter(item)}
      ></FilterDropdown>
      <ExtractList></ExtractList>
    </div>
  );
}
