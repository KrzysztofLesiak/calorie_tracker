import { FormEvent, useContext, useEffect } from "react";
import { ProductContext, ProductType } from "../../context/ProductContext";
import { useParams } from "react-router-dom";
import { getSingleProduct, updateProduct } from "../../utils/firebase/firebase";
import { useProduct } from "../../hooks/useProduct";
import { UserContext } from "../../context/UserContext";

export const Product = () => {
  const { productId } = useParams();
  const { product, inputValue, setProduct, handleInput, setInputValue } =
    useProduct();
  const { fetchData } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const productToUpdate = {
      ...product,
      ...inputValue,
    };

    console.log(productToUpdate);

    await updateProduct(productToUpdate);
    fetchData();
  };

  const updateInputs = async (productId: string) => {
    const singleProduct = (await getSingleProduct(productId)) as ProductType;
    setProduct(singleProduct);
    setInputValue(singleProduct);
  };

  useEffect(() => {
    if (productId) updateInputs(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return (
    <div>
      {product?.createdBy}
      <form className="new-product__form" onSubmit={handleEditSubmit}>
        <label htmlFor="productName">
          <input
            id="productName"
            type="text"
            name="productName"
            value={inputValue.productName}
            onChange={handleInput}
          />
        </label>
        <label htmlFor="energy-value">
          <input
            id="energy-value"
            type="number"
            name="energyValue"
            value={inputValue.energyValue}
            onChange={handleInput}
            min={0}
          />
        </label>
        <label htmlFor="proteins">
          <input
            id="proteins"
            type="number"
            name="proteins"
            value={inputValue.proteins}
            onChange={handleInput}
            min={0}
          />
        </label>
        <label htmlFor="fats">
          <input
            id="fats"
            type="number"
            name="fats"
            value={inputValue.fats}
            onChange={handleInput}
            min={0}
          />
        </label>
        <label htmlFor="carbohydrates">
          <input
            id="carbohydrates"
            type="number"
            name="carbohydrates"
            value={inputValue.carbohydrates}
            onChange={handleInput}
            min={0}
          />
        </label>
        {user?.uid === product?.createdBy && (
          <button type="submit">Edytuj produkt</button>
        )}
      </form>
    </div>
  );
};
