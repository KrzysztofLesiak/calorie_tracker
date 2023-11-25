import { createContext, JSX, useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { getProducts } from "../utils/firebase/firebase";

export type ProductType = {
  id?: string;
  productName: string;
  energyValue: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  createdBy?: string;
  amount?: number;
};

type ProductContextProps = {
  productsList: ProductType[];
  fetchData: () => Promise<void>;
};

type ProductProviderProps = {
  children: JSX.Element;
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const { productsList, setProductsList } = useProduct();

  const fetchData = async () => {
    const response = (await getProducts()) as ProductType[];

    if (response) setProductsList(response);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productsList,
        fetchData
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
