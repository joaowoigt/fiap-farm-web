"use client";
import React, { JSX } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function Page(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-gradientStart to-gradientEnd w-auto h-screen flex flex-row p-big items-center justify-evenly">
      <LoginForm></LoginForm>
      <RegisterForm></RegisterForm>
    </div>
  );
}
