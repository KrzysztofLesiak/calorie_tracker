import {
  createContext,
  useState,
  JSX,
  ChangeEvent,
  FormEvent,
  useEffect
} from "react";
import {
  authStateObserver,
  createUser,
  signIn,
  signOutUser
} from "../utils/firebase/firebase";
import { FirebaseError } from "firebase/app";
import { useLocation, useNavigate } from "react-router-dom";
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
  user: User | null;
  isLoading: boolean;
  errorMsg: ErrorMsgTypes;
  matchValidation: {
    email: boolean;
    username: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegisterInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (event: FormEvent<HTMLFormElement>) => void;
  handleLogin: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
  setErrorMsg: React.Dispatch<React.SetStateAction<ErrorMsgTypes>>;
};

type ErrorMsgTypes = {
  email: string;
  username: string;
  password: string[];
  confirmPassword: string;
  others: string;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [inputValue, setInputValue] = useState({
    email: "test@test.pl",
    password: "test123"
  });
  const [registerInputValue, setRegisterInputValue] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [token, setToken] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    username: "",
    password: [],
    confirmPassword: "",
    others: ""
  } as ErrorMsgTypes);
  const [matchValidation, setMatchValidation] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false
  });
  const { state } = useLocation();
  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

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

    let i = 0;
    setErrorMsg({
      email: "",
      username: "",
      password: [],
      confirmPassword: "",
      others: ""
    });

    if (!registerInputValue.email) {
      i++;
      setErrorMsg((prev) => ({ ...prev, email: "Wprowadź adres email" }));
    }

    if (!registerInputValue.username) {
      i++;
      setErrorMsg((prev) => ({
        ...prev,
        username: "Wprowadź nazwę użytkownika"
      }));
    }

    if (!registerInputValue.password.length) {
      i++;
      setErrorMsg((prev) => ({
        ...prev,
        password: [...prev.password, "Wprowadź hasło"]
      }));
    } else if (!matchValidation.password) {
      i++;
      if (!registerInputValue.password.match(/[0-9]/g))
        setErrorMsg((prev) => ({
          ...prev,
          password: [...prev.password, "Hasło musi zawierać cyfry"]
        }));

      if (!registerInputValue.password.match(/[A-Z]/g))
        setErrorMsg((prev) => ({
          ...prev,
          password: [...prev.password, "Hasło musi zawierać wielkie litery"]
        }));

      if (!registerInputValue.password.match(/[a-z]/g))
        setErrorMsg((prev) => ({
          ...prev,
          password: [...prev.password, "Hasło musi zawierać małe litery"]
        }));

      if (!registerInputValue.password.match(/[@$!%*?&]/g))
        setErrorMsg((prev) => ({
          ...prev,
          password: [
            ...prev.password,
            "Hasło musi zawierać znak specjalny @$!%*?&"
          ]
        }));

      if (registerInputValue.password.length <= 6)
        setErrorMsg((prev) => ({
          ...prev,
          password: [
            ...prev.password,
            "Długość hasła musi być większa niż 6 znaków"
          ]
        }));
    }
    if (!registerInputValue.confirmPassword) {
      i++;
      setErrorMsg((prev) => ({
        ...prev,
        confirmPassword: "Wprowadź hasło potwierdzające"
      }));
    }

    if (registerInputValue.confirmPassword !== registerInputValue.password) {
      i++;
      setErrorMsg((prev) => ({
        ...prev,
        confirmPassword: "Hasła muszą być identyczne"
      }));
    }

    if (i > 0) return;

    const response = await createUser(
      registerInputValue.email,
      registerInputValue.password,
      registerInputValue.username
    );

    if (response instanceof FirebaseError) {
      if (response.code === "auth/invalid-email")
        setErrorMsg((prev) => ({ ...prev, email: "Nieprawidłowy email" }));
      else if (response.code === "auth/missing-password")
        setErrorMsg((prev) => ({
          ...prev,
          password: [...prev.password, "Brakujące hasło"]
        }));
      else if (response.code === "auth/email-already-in-use")
        setErrorMsg((prev) => ({ ...prev, email: "Email jest już zajęty" }));
      else if (response.code === "auth/weak-password")
        setErrorMsg((prev) => ({
          ...prev,
          password: [
            ...prev.password,
            "Hasło powinno zawierać minimum 6 znaków"
          ]
        }));
      // TODO handle createUser errors
      return;
    }

    navigate("/");
  };

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await signIn(inputValue.email, inputValue.password);

    if (response === "auth/invalid-login-credentials") {
      setErrorMsg((prev) => ({
        ...prev,
        others: "Nieprawidłowy email lub hasło"
      }));
      return;
    }

    state?.from.pathname ? navigate(state.from.pathname) : navigate(-1);
  };

  const handleLogout = async () => {
    signOutUser();
    setToken("");
  };

  const onAuthChange = async (user: User | null) => {
    if (user) {
      setUser(user);
      setIsLoading(false);
      setToken(user.uid);
    } else {
      setUser(null);
      setIsLoading(false);
      setToken("");
    }
  };

  useEffect(() => {
    registerInputValue.email.match(emailRegex)
      ? setMatchValidation((prev) => ({ ...prev, email: true }))
      : setMatchValidation((prev) => ({ ...prev, email: false }));
    registerInputValue.username.trim().length
      ? setMatchValidation((prev) => ({ ...prev, username: true }))
      : setMatchValidation((prev) => ({ ...prev, username: false }));
    registerInputValue.password.match(passwordRegex)
      ? setMatchValidation((prev) => ({ ...prev, password: true }))
      : setMatchValidation((prev) => ({ ...prev, password: false }));
    registerInputValue.password === registerInputValue.confirmPassword
      ? setMatchValidation((prev) => ({ ...prev, confirmPassword: true }))
      : setMatchValidation((prev) => ({ ...prev, confirmPassword: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerInputValue]);

  useEffect(() => {
    const unsubscribe = authStateObserver(onAuthChange);

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        inputValue,
        registerInputValue,
        token,
        user,
        isLoading,
        errorMsg,
        matchValidation,
        handleInput,
        handleRegisterInput,
        handleRegister,
        handleLogin,
        handleLogout,
        setErrorMsg
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
