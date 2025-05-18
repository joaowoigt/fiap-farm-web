import React, { useState } from "react";
import { Text } from "./texts";

export interface DropDownItem {
  title: string;
  type: any;
}

interface Props {
  onSelect: (item: any) => void;
}

export enum FilterTypes {
  Credit = "Crédito",
  Debit = "Débito",
  All = "All",
}

const menuDropDownItems: DropDownItem[] = [
  { title: "Débito", type: FilterTypes.Debit },
  { title: "Crédito", type: FilterTypes.Credit },
  { title: "Todas transações", type: FilterTypes.All },
];

export function FilterDropdown(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Todas transações");
  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const onItemSelected = (item: DropDownItem) => {
    toggle();
    setSelected((value) => item.title);
  };

  const transClass = isOpen ? "ui-flex" : "ui-hidden";

  return (
    <>
      <div className="ui-relative">
        <div
          className="ui-outline ui-outline-1 ui-outline-primary  ui-bg-white ui-rounded-md ui-px-small ui-w-[250px] mobile:ui-w-[270px] ui-py-small ui-text-black ui-text-start ui-flex ui-flex-row ui-justify-between hover:ui-cursor-pointer"
          onClick={toggle}
        >
          <Text text={selected} intent="Small" color="black"></Text>
          {isOpen ? (
            <svg
              className="ui-w-6 ui-h-6 ui-text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M5.575 13.729C4.501 15.033 5.43 17 7.12 17h9.762c1.69 0 2.618-1.967 1.544-3.271l-4.881-5.927a2 2 0 0 0-3.088 0l-4.88 5.927Z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="ui-w-6 ui-h-6 ui-text-primary"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div
          className={`ui-absolute ui-z-30 ui-w-[250px] ui-flex ui-flex-col ui-items-center ui-bg-white ui-rounded-md  ui-outline ui-outline-1 ui-outline-primary  ${transClass} mobile:ui-w-[270px]`}
        >
          {menuDropDownItems.map((item) => (
            <a
              key={item.title}
              className="hover:ui-bg-secondaryVariant  hover:ui-font-semibold hover:ui-cursor-pointer ui-text-black ui-w-[250px] ui-text-center ui-py-small mobile:ui-w-[270px]"
              onClick={() => {
                onItemSelected(item);
                props.onSelect(item.type);
              }}
            >
              {item.title}
            </a>
          ))}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed ui-top-0 ui-right-0 ui-bottom-0 ui-left-0 ui-z-20 ui-bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
