import { FormEvent, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useProduct } from "../../hooks/useProduct";

import "./NewProduct.scss";

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
        <label htmlFor="productName" className="new-product__name-box">
          <p>Nazwa produktu</p>
          <input
            className="new-product__name"
            id="productName"
            type="text"
            name="productName"
            value={inputValue.productName}
            onChange={handleInput}
            required
          />
        </label>
        <p className="new-product__info">Wartości odżywcze na 100g</p>
        <label htmlFor="energy-value" className="new-product__box">
          <span>Wartość energetyczna</span>
          <div className="new-product__value-box"></div>
          <input
            className="new-product__input"
            id="energy-value"
            type="number"
            name="energyValue"
            value={inputValue.energyValue}
            onChange={handleInput}
            min={0}
          />
          kcal
        </label>
        <label htmlFor="proteins" className="new-product__box">
          <span>Białko</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="proteins"
              type="number"
              name="proteins"
              value={inputValue.proteins}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <label htmlFor="fats" className="new-product__box">
          <span>Tłuszcze</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="fats"
              type="number"
              name="fats"
              value={inputValue.fats}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <label htmlFor="carbohydrates" className="new-product__box">
          <span>Węglowodany</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="carbohydrates"
              type="number"
              name="carbohydrates"
              value={inputValue.carbohydrates}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <button className="new-product__add-btn" type="submit">
          Dodaj produkt
        </button>
      </form>
    </div>
  );
};
