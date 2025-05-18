"use client";
import { Text } from "@repo/ui/texts";
import { useRouter } from "next/navigation";

export default function ExtractItem({
  _id = "",
  month = "",
  type = "",
  fullDate = "",
  value = "",
}) {
  const router = useRouter();

  const handleOnClick = () => {
    router.push(`/transactionDetails/id=${_id}`);
  };
  return (
    <div
      className="flex flex-col mt-big  outline outline-1 outline-primary rounded-md p-big mobile:w-[300px]"
      key={_id}
    >
      <Text
        intent="ExtraSmall"
        color="secondary"
        text={month}
        style="bold"
      ></Text>
      <div className="flex flex-row justify-between mt-small mb-small">
        <Text intent="Small" color="black" text={type}></Text>
        <Text intent="ExtraSmall" color="darkGray" text={fullDate}></Text>
      </div>
      <Text intent="Small" color="black" text={value} style="bold"></Text>
    </div>
  );
}
