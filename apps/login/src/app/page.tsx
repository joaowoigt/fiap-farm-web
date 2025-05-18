"use client";
import React, { JSX } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { FirebaseAuthRepository } from "../data/firebase/Auth/firebase-auth-repository";
import { RegisterUseCaseImpl } from "../domain/useCases/register/RegisterUseCaseImpl";

const authRepository = new FirebaseAuthRepository();
const registerUseCase = new RegisterUseCaseImpl(authRepository);

export default function Page(): JSX.Element {
  return (
    <div className="bg-gradient-to-b from-gradientStart to-gradientEnd w-auto h-screen flex flex-row p-big items-center justify-evenly">
      <LoginForm></LoginForm>
      <RegisterForm registerUseCase={registerUseCase}></RegisterForm>
    </div>
  );
}
