"use client";
import React, { JSX } from "react";
import RegisterFormController from "./registerForm";
import LoginFormController from "./loginForm";

export default function Page(): JSX.Element {
  return (
    <div className="bg-background w-auto h-screen flex flex-row p-6 items-center justify-evenly">
      <LoginFormController />
      <RegisterFormController />
    </div>
  );
}
