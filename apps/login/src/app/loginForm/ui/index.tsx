import { Text } from "@repo/ui/texts";
import { Button } from "@repo/ui/buttons";

interface LoginFormScreenProps {
  email: string;
  password: string;
  loading: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: { show: boolean; message: string };
}

export default function LoginFormScreen({
  email,
  password,
  loading,
  onSubmit,
  handleEmailChange,
  handlePasswordChange,
  error,
}: LoginFormScreenProps) {
  return (
    <div>
      <div className="flex flex-col items-center  w-[450px] justify-center border-2 border-black p-4 rounded-lg bg-white bg-opacity-10">
        <Text intent="Heading" color="default" style="bold" text="Login"></Text>
        {error.show && (
          <Text
            intent="Regular"
            color="negative"
            style="bold"
            text={error.message}
          ></Text>
        )}
        <form>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Email"
          ></Text>{" "}
          <input
            className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="text"
            name="emailname"
            value={email}
            onChange={handleEmailChange}
            color="default"
          ></input>
          <Text
            intent="Regular"
            color="default"
            style="bold"
            text="Senha"
          ></Text>{" "}
          <input
            className="outline outline-1 outline-primary  mb-6 mt-4 bg-white rounded-md px-3 w-[250px]  py-3 text-black text-start flex flex-row hover:cursor-text"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            color="default"
          ></input>{" "}
          <div className="flex flex-row justify-center">
            <Button
              intent="primary"
              text={loading ? "Conectando..." : "Conectar"}
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
