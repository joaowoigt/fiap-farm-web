"use client";
import HomeFooter from "./home/HomeFooter";
import { HomeHeader, MobileHeader } from "./home/HomeHeader";
import HomeMain from "./home/HomeMain/HomeMain";

export default function Page(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-gradientStart to-gradientEnd w-auto h-full flex flex-col">
      <HomeHeader></HomeHeader>
      <MobileHeader></MobileHeader>
      <HomeMain></HomeMain>
      <HomeFooter></HomeFooter>
    </div>
  );
}
