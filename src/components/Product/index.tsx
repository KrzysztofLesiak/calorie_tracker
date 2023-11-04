import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useProduct } from "../../hooks/useProduct";

export const Product = () => {
  const { productId } = useParams();
  const {
    product,
    inputValue,
    handleInput,
    updateInputs,
    handleEditSubmit,
    handleDelete,
    setInputValue,
  } = useProduct();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (productId) updateInputs(productId);

    return setInputValue({
      productName: "",
      energyValue: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
    });
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
      {user?.uid === product?.createdBy && (
        <button onClick={() => handleDelete(productId)} type="button">
          Usuń produkt
        </button>
      )}
    </div>
  );
};
