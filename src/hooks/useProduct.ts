import { ChangeEvent, useState } from "react";
import { addProduct, getProducts } from "../utils/firebase/firebase";
import { ProductType } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

type UseProductData = {
  product: ProductType | undefined;
  productsList: ProductType[];
  inputValue: ProductType;
  setProduct: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
  setProductsList: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputValue: React.Dispatch<React.SetStateAction<ProductType>>;
  handleNewProductSubmit: (uid: string) => void;
};

export const useProduct = (): UseProductData => {
  const [product, setProduct] = useState<ProductType>();
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [inputValue, setInputValue] = useState({
    productName: "",
    energyValue: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = (await getProducts()) as ProductType[];

    if (response) setProductsList(response);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewProductSubmit = async (uid: string) => {
    if (inputValue.productName.length > 2) {
      const product = {
        productName: inputValue.productName,
        energyValue: inputValue.energyValue,
        proteins: inputValue.proteins,
        fats: inputValue.fats,
        carbohydrates: inputValue.carbohydrates,
        createdBy: uid,
      };

      await addProduct(product);
      fetchData();
      setInputValue({
        productName: "",
        energyValue: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
      });
      navigate("/products");
    }
  };

  return {
    product,
    productsList,
    inputValue,
    setProduct,
    setProductsList,
    handleInput,
    setInputValue,
    handleNewProductSubmit,
  };
};
