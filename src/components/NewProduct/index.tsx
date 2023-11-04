import { ProductContext } from "../../context/ProductContext";
import { FormEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const NewProduct = () => {
  const { newProductInput, handleNewProductInput, handleNewProductSubmit } =
    useContext(ProductContext);
  const { user } = useContext(UserContext);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.displayName) handleNewProductSubmit(user.displayName);
  };

  return (
    <div className="new-product">
      <form className="new-product__form" onSubmit={handleSubmit}>
        <label htmlFor="productName">
          <input
            id="productName"
            type="text"
            name="productName"
            value={newProductInput.productName}
            onChange={handleNewProductInput}
          />
        </label>
        <label htmlFor="energy-value">
          <input
            id="energy-value"
            type="number"
            name="energyValue"
            value={newProductInput.energyValue}
            onChange={handleNewProductInput}
            min={0}
          />
        </label>
        <label htmlFor="proteins">
          <input
            id="proteins"
            type="number"
            name="proteins"
            value={newProductInput.proteins}
            onChange={handleNewProductInput}
            min={0}
          />
        </label>
        <label htmlFor="fats">
          <input
            id="fats"
            type="number"
            name="fats"
            value={newProductInput.fats}
            onChange={handleNewProductInput}
            min={0}
          />
        </label>
        <label htmlFor="carbohydrates">
          <input
            id="carbohydrates"
            type="number"
            name="carbohydrates"
            value={newProductInput.carbohydrates}
            onChange={handleNewProductInput}
            min={0}
          />
        </label>
        <button type="submit">Dodaj produkt</button>
      </form>
    </div>
  );
};
