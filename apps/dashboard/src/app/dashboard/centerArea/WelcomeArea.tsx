import { Text } from "@repo/ui/texts";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../../features/user/userSlice";
import Production from "../../../domain/models/farm/production/Production";
import User from "../../../domain/models/farm/user/User";

export default function WelcomeArea({ name }: { name: string }) {
  const [currentDate, setCurrentDate] = useState(getDate());

  return (
    <div className="flex flex-col">
      <Text
        intent="ExtraHeading"
        color="onPrimary"
        text={`Bem-vindo(a), ${name}`}
      ></Text>
      <Text
        intent="Regular"
        color="onPrimary"
        text={currentDate}
        mt="base"
      ></Text>
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
