import { FormEvent, useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useProduct } from "../../../hooks/useProduct";

import "./NewProduct.scss";
import { useTranslation } from "react-i18next";

export const NewProduct = () => {
  const { inputValue, handleInput, handleNewProductSubmit } = useProduct();
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user?.uid) handleNewProductSubmit(user.uid);
  };

  return (
    <div className="new-product">
      <form className="new-product__form" onSubmit={handleSubmit}>
        <label htmlFor="productName" className="new-product__name-box">
          <p>{t("productName")}</p>
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
        <p className="new-product__info">{t("nutritionalValues")}</p>
        <label htmlFor="energy-value" className="new-product__box">
          <span>{t("energyValue")}</span>
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
          <span>{t("proteins")}</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="proteins"
              type="number"
              step="0.01"
              name="proteins"
              value={inputValue.proteins}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <label htmlFor="fats" className="new-product__box">
          <span>{t("fats")}</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="fats"
              type="number"
              step="0.01"
              name="fats"
              value={inputValue.fats}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <label htmlFor="carbohydrates" className="new-product__box">
          <span>{t("carbohydrates")}</span>
          <div className="new-product__value-box">
            <input
              className="new-product__input"
              id="carbohydrates"
              type="number"
              step="0.01"
              name="carbohydrates"
              value={inputValue.carbohydrates}
              onChange={handleInput}
              min={0}
            />
            g
          </div>
        </label>
        <button className="new-product__add-btn" type="submit">
          {t("addProduct")}
        </button>
      </form>
    </div>
  );
};
