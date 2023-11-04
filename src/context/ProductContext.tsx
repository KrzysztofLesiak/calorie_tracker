import { ChangeEvent, createContext, JSX, useEffect, useState } from "react";
import { addProduct, getProducts } from "../utils/firebase/firebase";

export type ProductType = {
  id?: string;
  productName: string;
  energyValue: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  createdBy: string;
};

type ProductContextProps = {
  newProductInput: ProductType;
  productsList: ProductType[];
  handleNewProductInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNewProductSubmit: (displayName: string) => void;
};

type ProductProviderProps = {
  children: JSX.Element;
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [newProductInput, setNewProductInput] = useState({
    productName: "",
    energyValue: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    createdBy: "",
  });
  const [productsList, setProductsList] = useState<ProductType[]>([]);

  const fetchData = async () => {
    const products = (await getProducts()) as ProductType[];

    setProductsList(products);
  };

  const handleNewProductInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setNewProductInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewProductSubmit = (displayName: string) => {
    if (newProductInput.productName.length > 2) {
      const product = {
        productName: newProductInput.productName,
        energyValue: newProductInput.energyValue,
        proteins: newProductInput.proteins,
        fats: newProductInput.fats,
        carbohydrates: newProductInput.carbohydrates,
        createdBy: displayName,
      };

      addProduct(product);
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ProductContext.Provider
      value={{
        newProductInput,
        productsList,
        handleNewProductInput,
        handleNewProductSubmit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
