import { createContext, useState, JSX, ChangeEvent, FormEvent } from "react";
import { createUser } from "../utils/firebase/firebase";

type UserProviderProps = {
  children: JSX.Element;
};

type UserContextType = {
  inputValue: {
    email: string;
    password: string;
  };
  registerInputValue: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegisterInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps) => {
  // const [token, setToken] = useState("");
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [registerInputValue, setRegisterInputValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleRegisterInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegisterInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser(registerInputValue.email, registerInputValue.password);
  };

  return (
    <UserContext.Provider
      value={{
        inputValue,
        registerInputValue,
        handleInput,
        handleRegisterInput,
        handleRegister,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
