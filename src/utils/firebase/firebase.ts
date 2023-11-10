import { FirebaseError, initializeApp } from "firebase/app";
import {
  User,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth/cordova";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
  orderBy,
  query,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { ProductType } from "../../context/ProductContext";

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

// AUTH
const auth = getAuth(app);

export const createUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  if (!email || !password || !displayName) return;

  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (!response) throw new Error("Something went wrong");

    const user = response.user;
    // Updating displayName of created user
    await updateProfile(user, {
      displayName,
    });

    await addDoc(collection(db, "users"), {
      uid: user.uid,
    });

    return user;
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) throw { error };

    console.log(error);

    return error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (!response) throw new Error("Something went wrong");

    // const accessToken = await response.user.getIdToken();
    return "Logged in";
  } catch (error: unknown) {
    if (!(error instanceof FirebaseError)) throw { error };
    return error.code;
  }
};

export const signOutUser = async () => await signOut(auth);

export const authStateObserver = (
  callback: (user: User | null) => Promise<void>
) => {
  return onAuthStateChanged(auth, callback);
};

// CLOUD FIRESTORE

const db = getFirestore(app);

export const addProduct = async (product: ProductType) => {
  const { productName, energyValue, proteins, fats, carbohydrates, createdBy } =
    product;
  try {
    const docRef = await addDoc(collection(db, "products"), {
      productName,
      energyValue,
      proteins,
      fats,
      carbohydrates,
      createdBy,
      createdTime: Timestamp.now(),
    });

    return docRef;
  } catch (error) {
    return error;
  }
};

export const getProducts = async () => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("productName", "asc"));
  try {
    const response = await getDocs(q);

    return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    return error;
  }
};

export const getSingleProduct = async (productId: string) => {
  const docRef = doc(db, "products", productId);
  const response = await getDoc(docRef);

  return { id: response.id, ...response.data() } as ProductType;
};

export const updateProduct = async (product: ProductType) => {
  try {
    const docRef = doc(db, "products", product.id!);
    await updateDoc(docRef, {
      ...product,
    });
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const docRef = doc(db, "products", productId);
    await deleteDoc(docRef);
  } catch (error) {
    return error;
  }
};

export const addToList = async (
  uid: string,
  date: string,
  mealType: string,
  productId: string,
  quantity: number
) => {
  const mealListRef = doc(
    db,
    "users",
    uid,
    "mealList",
    date,
    mealType,
    productId
  );

  await setDoc(mealListRef, { id: productId, quantity });
};

export const getMealList = async (
  uid: string,
  date: string,
  mealType: string
) => {
  const docRef = collection(db, "users", uid, "mealList", date, mealType);
  const response = await getDocs(docRef);

  if (!response.empty) {
    const data = response.docs.map((doc) => doc.data());

    const products = await Promise.all(
      data.map(async ({ id, quantity }) => {
        const product = await getSingleProduct(id);
        return { ...product, quantity };
      })
    );
    return products;
  }

  return [];
};
