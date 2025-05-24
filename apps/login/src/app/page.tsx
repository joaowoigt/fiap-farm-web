"use client";
import React, { JSX } from "react";
import RegisterFormController from "./registerForm";
import { registerUseCaseImpl } from "../domain/useCases/register/RegisterUseCaseImpl";
import { loginUseCaseImpl } from "../domain/useCases/login/LoginUseCaseImpl";
import LoginFormController from "./loginForm";

const registerUseCase = registerUseCaseImpl;
const loginUseCase = loginUseCaseImpl;

export default function Page(): JSX.Element {
  return (
    <div className="bg-background w-auto h-screen flex flex-row p-6 items-center justify-evenly">
      <LoginFormController loginUseCase={loginUseCase}></LoginFormController>
      <RegisterFormController
        registerUseCase={registerUseCase}
      ></RegisterFormController>
    </div>
  );
}
