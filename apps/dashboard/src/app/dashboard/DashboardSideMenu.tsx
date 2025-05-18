import { Text } from "@repo/ui/texts";

export default function DasboardSideMenu() {
  return (
    <section className="h-screen bg-grey w-[180px] flex flex-col ml-[10%] items-center py-[37px] rounded-2xl mobile:hidden">
      <Text
        intent="Regular"
        color="secondary"
        style="bold"
        text="Inicio"
        hover="pointer"
      ></Text>
      <div className="bg-secondary w-[112px] h-[1px] my-medium"></div>
      <Text
        intent="Regular"
        color="black"
        text="Transferências"
        hover="pointer"
      ></Text>
      <div className="bg-black w-[112px] h-[1px] my-medium"></div>
      <Text
        intent="Regular"
        color="black"
        text="Investimentos"
        hover="pointer"
      ></Text>
      <div className="bg-black w-[112px] h-[1px] my-medium"></div>
      <Text
        intent="Regular"
        color="black"
        text="Outros serviços"
        hover="pointer"
      ></Text>
    </section>
  );
}
