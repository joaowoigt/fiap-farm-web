import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";

export interface RegisterFormScreenProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: { show: boolean; message: string };
  inputError: { show: boolean; message: string };
  success: boolean;
}

export default function RegisterFormScreen({
  onSubmit,
  handleUsernameChange,
  handleEmailChange,
  handlePasswordChange,
  error,
  inputError,
  success,
}: RegisterFormScreenProps) {
  return (
    <div>
      <div className="flex flex-col items-center  w-[450px] justify-center border-2 border-black p-4 rounded-lg bg-white bg-opacity-10">
        <Text
          intent="Heading"
          color="default"
          style="bold"
          text="Cadastre-se"
        ></Text>
        {error.show && (
          <Text
            intent="Regular"
            color="negative"
            style="bold"
            text={error.message}
          ></Text>
        )}
        {inputError.show && (
          <Text
            intent="RegultarBorded"
            color="negative"
            style="bold"
            text={inputError.message}
          ></Text>
        )}
        <form>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Nome"
          ></Text>
          <input
            className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="username"
            id="userNameInput"
            onChange={handleUsernameChange}
            color="default"
          ></input>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Email"
          ></Text>
          <input
            className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="emailname"
            id="emailInput"
            onChange={handleEmailChange}
            color="default"
          ></input>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Senha"
          ></Text>
          <input
            className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="password"
            name="password"
            id="passwordInput"
            onChange={handlePasswordChange}
            color="default"
          ></input>
          {success && (
            <Text
              intent="Regular"
              color="default"
              style="bold"
              text="Usuário cadastrado com sucesso"
            ></Text>
          )}
          <div className="flex flex-row justify-center">
            <Button
              intent="primary"
              text="Resgistrar"
              onClick={(event) => {
                onSubmit(event);
              }}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
}
