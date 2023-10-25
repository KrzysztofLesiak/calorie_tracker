import { createContext, useState, JSX, ChangeEvent } from "react";

type UserProviderProps = {
  children: JSX.Element;
};

type UserContextType = {
  inputValue: {
    email: string;
    password: string;
  };
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
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

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValue((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <UserContext.Provider value={{ inputValue, handleInput }}>
      {children}
    </UserContext.Provider>
  );
};
