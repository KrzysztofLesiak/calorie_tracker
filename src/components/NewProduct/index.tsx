import { FormEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useProduct } from "../../hooks/useProduct";

export const NewProduct = () => {
  const { inputValue, handleInput, handleNewProductSubmit } = useProduct();
  const { user } = useContext(UserContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.uid) handleNewProductSubmit(user.uid);
  };

  return (
    <div className="new-product">
      <form className="new-product__form" onSubmit={handleSubmit}>
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
        <button type="submit">Dodaj produkt</button>
      </form>
    </div>
  );
};
