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
  errorMsg: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegisterInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
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
  const [errorMsg, setErrorMsg] = useState("");
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

    if (!registerInputValue.email) {
      setErrorMsg("Wprowadź adres email");
      return;
    } else if (!registerInputValue.username) {
      setErrorMsg("Wprowadź nazwę użytkownika");
      return;
    } else if (!registerInputValue.password) {
      setErrorMsg("Wprowadź hasło");
      return;
    } else if (!registerInputValue.confirmPassword) {
      setErrorMsg("Wprowadź hasło potwierdzające");
      return;
    } else if (
      registerInputValue.confirmPassword !== registerInputValue.password
    ) {
      setErrorMsg("Hasła muszą być identyczne");
      return;
    }

    const response = await createUser(
      registerInputValue.email,
      registerInputValue.password,
      registerInputValue.username
    );

    if (response instanceof FirebaseError) {
      if (response.code === "auth/invalid-email")
        setErrorMsg("Nieprawidłowy email");
      else if (response.code === "auth/missing-password")
        setErrorMsg("Brakujące hasło");
      else if (response.code === "auth/email-already-in-use")
        setErrorMsg("Email jest już zajęty");
      else if (response.code === "auth/weak-password")
        setErrorMsg("Hasło powinno zawierać minimum 6 znaków");
      // TODO handle createUser errors
      return;
    }

    navigate("/");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await signIn(inputValue.email, inputValue.password);

    if (response === "auth/invalid-login-credentials") {
      setErrorMsg("Nieprawidłowy email lub hasło");
      return;
    }

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
        errorMsg,
        handleInput,
        handleRegisterInput,
        handleRegister,
        handleLogin,
        handleLogout,
        setErrorMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
