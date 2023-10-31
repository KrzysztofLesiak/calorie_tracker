import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  if (!email || !password) return;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!response) throw new Error("Something went wrong");

    const user = response.user;
    // Updating displayName of created user
    updateProfile(user, {
      displayName,
    });

    return user;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) throw { error };

    return error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (!response) throw new Error("Something went wrong");

    const accessToken = await response.user.getIdToken();
    return accessToken;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) throw { error };
    return error;
  }
};
