import { CloseIcon, HamburguerMenuVariant } from "@repo/ui/icons";
import { useState } from "react";
import { Text } from "@repo/ui/texts";

export default function HamburguerMenuDashboard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div>
      {isOpen ? (
        <>
          <section className="h-fit absolute bg-grey w-[180px] flex flex-col items-center py-3 rounded-2xl">
            <div className="flex flex-row w-full justify-end">
              <CloseIcon onClick={() => setIsOpen(false)}></CloseIcon>
            </div>
            <Text
              intent="Regular"
              color="secondary"
              style="bold"
              text="Inicio"
              hover="pointer"
            ></Text>
            <div className="bg-secondary w-[112px] h-[1px] my-base"></div>
            <Text
              intent="Regular"
              color="default"
              text="Transferências"
              hover="pointer"
            ></Text>
            <div className="bg-black w-[112px] h-[1px] my-base"></div>
            <Text
              intent="Regular"
              color="default"
              text="Investimentos"
              hover="pointer"
            ></Text>
            <div className="bg-black w-[112px] h-[1px] my-base"></div>
            <Text
              intent="Regular"
              color="default"
              text="Outros serviços"
              hover="pointer"
            ></Text>
          </section>
        </>
      ) : (
        <>
          <HamburguerMenuVariant
            onClick={() => setIsOpen(!isOpen)}
          ></HamburguerMenuVariant>
        </>
      )}
    </div>
  );
}
