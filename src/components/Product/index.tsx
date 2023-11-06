import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useProduct } from "../../hooks/useProduct";

import "./Product.scss";

export const Product = () => {
  const [isActive, setIsActive] = useState(false);
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

  const navigate = useNavigate();

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

  useEffect(() => {
    if (product) setIsActive(true);
  }, [product]);

  return (
    <>
      <div
        className="product__background"
        onClick={() => {
          setIsActive(false);
          setTimeout(() => {
            navigate("/products");
          }, 400);
        }}
      ></div>
      <div
        className={
          isActive
            ? "product__container product__container--active"
            : "product__container"
        }
      >
        <form className="product__form" onSubmit={handleEditSubmit}>
          <input
            className="product__name"
            id="productName"
            type="text"
            name="productName"
            value={inputValue.productName}
            onChange={handleInput}
          />
          <p className="product__info">Wartości odżywcze na 100g</p>
          <label htmlFor="energy-value" className="product__box">
            <span>Wartość energetyczna</span>
            <div className="product__value-box">
              <input
                className="product__input"
                id="energy-value"
                type="number"
                name="energyValue"
                value={inputValue.energyValue}
                onChange={handleInput}
                min={0}
              />
              <span>kcal</span>
            </div>
          </label>
          <label htmlFor="proteins" className="product__box">
            <span>Białko</span>
            <div className="product__value-box">
              <input
                className="product__input"
                id="proteins"
                type="number"
                name="proteins"
                value={inputValue.proteins}
                onChange={handleInput}
                min={0}
              />
              <span>g</span>
            </div>
          </label>
          <label htmlFor="fats" className="product__box">
            <span>Tłuszcze</span>
            <div className="product__value-box">
              <input
                className="product__input"
                id="fats"
                type="number"
                name="fats"
                value={inputValue.fats}
                onChange={handleInput}
                min={0}
              />
              <span>g</span>
            </div>
          </label>
          <label htmlFor="carbohydrates" className="product__box">
            <span>Węglowodany</span>
            <div className="product__value-box">
              <input
                className="product__input"
                id="carbohydrates"
                type="number"
                name="carbohydrates"
                value={inputValue.carbohydrates}
                onChange={handleInput}
                min={0}
              />
              <span>g</span>
            </div>
          </label>
          {user?.uid === product?.createdBy && (
            <button type="submit" className="product__edit-btn">
              Edytuj produkt
            </button>
          )}
          {user?.uid === product?.createdBy && (
            <button
              onClick={() => handleDelete(productId)}
              type="button"
              className="product__delete-btn"
            >
              Usuń produkt
            </button>
          )}
        </form>
      </div>
    </>
  );
};
