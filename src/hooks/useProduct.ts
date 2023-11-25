import {
  ChangeEvent,
  FormEvent,
  useState,
  useContext,
  useCallback
} from "react";
import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  updateProduct
} from "../utils/firebase/firebase";
import { ProductContext, ProductType } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

type UseProductData = {
  product: ProductType | undefined;
  productsList: ProductType[];
  inputValue: ProductType;
  isEditable: boolean;
  setProduct: React.Dispatch<React.SetStateAction<ProductType | undefined>>;
  setProductsList: React.Dispatch<React.SetStateAction<ProductType[]>>;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  setInputValue: React.Dispatch<React.SetStateAction<ProductType>>;
  handleNewProductSubmit: (uid: string) => Promise<void>;
  handleDelete: (productId: string | undefined) => Promise<void>;
  updateInputs: (productId: string) => Promise<void>;
  handleEditSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleEdit: () => void;
  handleCancel: (productId: string) => void;
};

export const useProduct = (): UseProductData => {
  const [product, setProduct] = useState<ProductType>();
  const [productsList, setProductsList] = useState<ProductType[]>([]);
  const [inputValue, setInputValue] = useState({
    productName: "",
    energyValue: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0
  });
  const [isEditable, setIsEditable] = useState(false);

  const { fetchData } = useContext(ProductContext);

  const navigate = useNavigate();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;

    type === "number"
      ? setInputValue((prev) => ({ ...prev, [name]: parseFloat(value) }))
      : setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewProductSubmit = async (uid: string) => {
    if (inputValue.productName.length > 2) {
      const product = {
        productName: inputValue.productName.toLowerCase(),
        createdBy: uid,
        energyValue: inputValue.energyValue / 100,
        proteins: inputValue.proteins / 100,
        fats: inputValue.fats / 100,
        carbohydrates: inputValue.carbohydrates / 100
      };

      await addProduct(product);
      fetchData();
      setInputValue({
        productName: "",
        energyValue: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0
      });
      navigate("/products");
    }
  };

  const handleDelete = async (productId: string | undefined) => {
    if (productId) {
      await deleteProduct(productId);
      fetchData();
      navigate("/products");
    }
  };

  const updateInputs = useCallback(async (productId: string) => {
    const singleProduct = (await getSingleProduct(productId)) as ProductType;
    setProduct(singleProduct);
    setInputValue(singleProduct);
  }, []);

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productToUpdate = {
      ...product,
      ...inputValue,
      productName: inputValue.productName.toLowerCase()
    };

    await updateProduct(productToUpdate);
    fetchData();
    setIsEditable(false);
  };

  const handleEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = (productId: string) => {
    setIsEditable(false);
    updateInputs(productId);
  };

  return {
    product,
    productsList,
    inputValue,
    isEditable,
    setProduct,
    setProductsList,
    handleInput,
    setInputValue,
    handleNewProductSubmit,
    handleDelete,
    updateInputs,
    handleEditSubmit,
    handleEdit,
    handleCancel
  };
};
