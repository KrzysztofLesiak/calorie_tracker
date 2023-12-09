import { createContext, JSX } from "react";
import { User } from "firebase/auth";
import { useUsers } from "../hooks/useUsers";

type UserProviderProps = {
  children: JSX.Element;
};

type UserContextType = {
  user: User | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user, isLoading } = useUsers();

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
