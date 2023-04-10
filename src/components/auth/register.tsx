import Button from "@components/form/button";
import Input from "@components/form/input";
import useOnClickOutside from "@hooks/useClickOutside";
import useInput from "@hooks/useInput";
import React, { useRef } from "react";

interface Props {
  onHide?: () => void;
  onOpen?: () => void;
  onSubmit?: ({
    email,
    name,
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }) => void;
}

const Register: React.FC<Props> = ({ onHide, onSubmit }) => {
  const [email, setEmailOnChange] = useInput();
  const [name, setNameOnChange] = useInput();
  const [password, setPasswordOnChange] = useInput();

  const registerRef = useRef<null | HTMLFormElement>(null);
  useOnClickOutside(registerRef, () => {
    if (onHide != null) onHide();
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (onSubmit != null) {
      onSubmit({
        email,
        name,
        password,
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex w-full flex-col items-center justify-center gap-4 bg-slate-600 bg-opacity-10 py-6">
      <form
        onSubmit={handleSubmit}
        ref={registerRef}
        className="flex flex-col gap-y-5 rounded-lg bg-white p-8"
      >
        <div className=" mb-8 flex flex-col items-center justify-start gap-y-5">
          <h2 className="text-center text-2xl font-semibold">
            Daftar MOO Space
          </h2>
          <div aria-label="Forum sepi, eh sapi moo . . ." className="h-20 w-20">
            <img
              src="/canvas.svg"
              alt="canvas logo"
              className="object-contain"
            />
          </div>
        </div>
        <Input
          required
          textLabel="Email"
          type="email"
          value={email}
          onChange={setEmailOnChange}
        />
        <Input
          required
          textLabel="Nama"
          type="text"
          value={name}
          onChange={setNameOnChange}
        />

        <div className="flex flex-col gap-y-2">
          <Input
            required
            textLabel="Password"
            type="password"
            value={password}
            onChange={setPasswordOnChange}
          />
        </div>

        <Button type="submit" className="bg-green-500 py-3 text-white">
          Daftar
        </Button>
      </form>
    </div>
  );
};

export default Register;
