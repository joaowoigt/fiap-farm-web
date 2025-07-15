import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";
import { UiError } from "../../../domain/models/uiError";
import { useEffect } from "react";

export interface RegisterFormScreenProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: { show: boolean; message: string };
  userNameError: UiError;
  emailError: UiError;
  passwordError: UiError;
  success: boolean;
  userName: string;
  email: string;
  password: string;
}

export default function RegisterFormScreen({
  onSubmit,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  error,
  userNameError,
  emailError,
  passwordError,
  success,
  userName,
  email,
  password,
}: RegisterFormScreenProps) {
  // Debug: log do estado de success
  useEffect(() => {
    console.log("Estado de success na UI mudou:", success);
  }, [success]);

  return (
    <div>
      <div className="flex flex-col items-center  w-[450px] justify-center border-2 border-black p-4 rounded-lg bg-white bg-opacity-10">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Cadastre-se"
        ></Text>{" "}
        {error.show && (
          <Text
            intent="Regular"
            color="negative"
            style="bold"
            text={error.message}
          ></Text>
        )}
        <form onSubmit={onSubmit}>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Nome"
          ></Text>{" "}
          <input
            className="outline outline-1 outline-primary  mb-2 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="username"
            id="userNameInput"
            value={userName}
            onChange={handleUsernameChange}
            color="default"
          ></input>
          {userNameError.show && (
            <Text
              intent="RegultarBorded"
              color="negative"
              style="bold"
              text={userNameError.message}
            ></Text>
          )}
          <div className="mb-4"></div>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Email"
          ></Text>{" "}
          <input
            className="outline outline-1 outline-primary  mb-2 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="email"
            name="emailname"
            id="emailInput"
            value={email}
            onChange={handleEmailChange}
            color="default"
          ></input>
          {emailError.show && (
            <Text
              intent="RegultarBorded"
              color="negative"
              style="bold"
              text={emailError.message}
            ></Text>
          )}
          <div className="mb-4"></div>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Senha"
          ></Text>{" "}
          <input
            className="outline outline-1 outline-primary  mb-2 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="password"
            name="password"
            id="passwordInput"
            value={password}
            onChange={handlePasswordChange}
            color="default"
          ></input>
          {passwordError.show && (
            <Text
              intent="RegultarBorded"
              color="negative"
              style="bold"
              text={passwordError.message}
            ></Text>
          )}{" "}
          <div className="mb-4"></div>
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
              <Text
                intent="Regular"
                color="default"
                style="bold"
                text="✅ Usuário cadastrado com sucesso!"
              ></Text>
            </div>
          )}
          <div className="flex flex-row justify-center">
            <Button
              intent="primary"
              text="Registrar"
              {...({ type: "submit" } as any)}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
