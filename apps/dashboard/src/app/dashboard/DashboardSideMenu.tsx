import { Text } from "@repo/ui/texts";

export default function DasboardSideMenu() {
  return (
    <section className="h-screen bg-secondary-light w-[180px] flex flex-col ml-[10%] items-center py-8 rounded-2xl mobile:hidden">
      <Text
        intent="Regular"
        color="primary"
        style="bold"
        text="Inicio"
        hover="pointer"
      ></Text>
      <div className="bg-primary w-[112px] h-[1px] my-2"></div>
      <Text
        intent="Regular"
        color="default"
        text="Transferências"
        hover="pointer"
      ></Text>
      <div className="bg-black w-[112px] h-[1px] my-2"></div>
      <Text
        intent="Regular"
        color="default"
        text="Investimentos"
        hover="pointer"
      ></Text>
      <div className="bg-black w-[112px] h-[1px] my-2"></div>
      <Text
        intent="Regular"
        color="default"
        text="Outros serviços"
        hover="pointer"
      ></Text>
    </section>
  );
}
