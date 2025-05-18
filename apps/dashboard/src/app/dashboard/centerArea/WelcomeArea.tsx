import { Text } from "@repo/ui/texts";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function WelcomeArea() {
  const name = useSelector((state: any) => state.centerArea.name);
  const [currentDate, setCurrentDate] = useState(getDate());
  const welcomeText = `Olá, ${name} :)`;
  return (
    <div className="flex flex-col">
      <Text intent="Heading" color="white" text={welcomeText}></Text>
      <Text intent="Small" color="white" text={currentDate} mt="big"></Text>
    </div>
  );
}

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  const dayNumber = today.getDay();
  const weekDay = weekday[dayNumber];
  return `${weekDay}, ${date}/${month}/${year}`;
}

const weekday: string[] = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
];
