import { HamburguerMenu, LogoIcon } from "@repo/ui/icons";
import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";

export function HomeHeader() {
  return (
    <header className="bg-black w-auto h-[96px] flex flex-row items-center pr-[10%] justify-around mobile:hidden">
      <div className="flex flex-row items-center w-[50%]">
        <LogoIcon></LogoIcon>
        <div className="flex flex-row w-[30%] justify-evenly ml-[72px]">
          <Text intent="Regular" color="secondary" text="Sobre"></Text>
          <Text intent="Regular" color="secondary" text="Serviços"></Text>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-[180] mr-big">
          <Button intent="secondary" text="">
            <a href="/login">Abrir minha conta</a>
          </Button>
        </div>
        <div className="w-[180]">
          <Button intent="secondaryVariant" text="">
            <a href="/login">Já tenho conta</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function MobileHeader() {
  return (
    <header className="hidden bg-black w-auto h-[96px] items-center justify-around mobile:flex flex-row">
      <div className="flex flex-row justify-between w-full px-medium">
        <HamburguerMenu></HamburguerMenu>
        <LogoIcon></LogoIcon>
      </div>
    </header>
  );
}
