import {
  createContext,
  useState,
  JSX,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import {
  authStateObserver,
  createUser,
  signIn,
  signOutUser,
} from "../utils/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";

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
  token: string;
  user: User | undefined;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegisterInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [inputValue, setInputValue] = useState({
    email: "test4@test.pl",
    password: "test123",
  });
  const [registerInputValue, setRegisterInputValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User>();
  const navigate = useNavigate();

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

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = await createUser(
      registerInputValue.email,
      registerInputValue.password,
      registerInputValue.username
    );

    if (user instanceof FirebaseError) {
      console.log(user);

      // TODO handle createUser errors
      return;
    }

    navigate("/");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const accessToken = await signIn(inputValue.email, inputValue.password);

    if (accessToken instanceof FirebaseError) {
      // TODO handle signIn errors
      return;
    }

    setToken(accessToken);
    navigate(-1);
  };

  const handleLogout = async () => {
    signOutUser();
    setToken("");
  };

  useEffect(() => {
    const unsubscribe = authStateObserver(async (user: User | null) => {
      if (user) {
        setUser(user);
        setToken(user.uid);
      } else {
        setUser(undefined);
        setToken("");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        inputValue,
        registerInputValue,
        token,
        user,
        handleInput,
        handleRegisterInput,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
