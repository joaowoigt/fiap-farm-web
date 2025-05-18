"use client";
import React, { JSX } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { registerUseCaseImpl } from "../domain/useCases/register/RegisterUseCaseImpl";
import { loginUseCaseImpl } from "../domain/useCases/login/LoginUseCaseImpl";

const registerUseCase = registerUseCaseImpl;
const loginUseCase = loginUseCaseImpl;

export default function Page(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-gradientStart to-gradientEnd w-auto h-screen flex flex-row p-big items-center justify-evenly">
      <LoginForm loginUseCase={loginUseCase}></LoginForm>
      <RegisterForm registerUseCase={registerUseCase}></RegisterForm>
    </div>
  );
}
