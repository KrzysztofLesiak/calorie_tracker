import { ChangeEvent, createContext, JSX, useEffect } from "react";
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
};

type ProductContextProps = {
  inputValue: ProductType;
  productsList: ProductType[];
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNewProductSubmit: (displayName: string) => void;
  fetchData: () => Promise<void>;
};

type ProductProviderProps = {
  children: JSX.Element;
};

export const ProductContext = createContext({} as ProductContextProps);

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const {
    productsList,
    inputValue,
    handleInput,
    setProductsList,
    handleNewProductSubmit,
  } = useProduct();

  const fetchData = async () => {
    const response = (await getProducts()) as ProductType[];

    if (response) setProductsList(response);
  };

  // const fetchProduct = async (productId: string) => {
  //   const product = getSingleProduct(productId);

  //   return product;
  // };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productsList,
        inputValue,
        handleInput,
        handleNewProductSubmit,
        fetchData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
