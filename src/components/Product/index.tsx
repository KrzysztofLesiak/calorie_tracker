import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useProduct } from "../../hooks/useProduct";

import Arrow from "../../assets/arrow-right-solid.svg?react";

import "./Product.scss";
import { TrackerContext } from "../../context/TrackerContext";

type ProductProps = {
  functionality: string;
};

export const Product = ({ functionality }: ProductProps) => {
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
  const { amount, handleAmount, addProductToList } = useContext(TrackerContext);

  const navigate = useNavigate();

  const handleNavigate = () => {
    setIsActive(false);
    setTimeout(() => {
      navigate(-1);
    }, 400);
  };

  useEffect(() => {
    if (productId) updateInputs(productId);

    return setInputValue({
      productName: "",
      energyValue: 0,
      proteins: 0,
      fats: 0,
      carbohydrates: 0,
    });
  }, [productId, setInputValue, updateInputs]);

  useEffect(() => {
    if (product) setIsActive(true);
  }, [product]);

  return (
    <>
      <div className="product__background" onClick={handleNavigate}></div>
      <div
        className={
          isActive
            ? "product__container product__container--active"
            : "product__container"
        }
      >
        <Arrow className="product__arrow" onClick={handleNavigate} />
        <form className="product__form" onSubmit={handleEditSubmit}>
          <input
            className="product__name"
            id="productName"
            type="text"
            name="productName"
            value={inputValue.productName}
            onChange={handleInput}
            disabled={user?.uid !== product?.createdBy}
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
                disabled={user?.uid !== product?.createdBy}
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
                disabled={user?.uid !== product?.createdBy}
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
                disabled={user?.uid !== product?.createdBy}
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
                disabled={user?.uid !== product?.createdBy}
              />
              <span>g</span>
            </div>
          </label>
          {functionality === "edit" && (
            <>
              {user?.uid === product?.createdBy && (
                <button type="submit" className="product__btn">
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
            </>
          )}
          {functionality === "add" && (
            <>
              <label className="product__amount" htmlFor="amount">
                <span>Ilość:</span>
                <div>
                  <input
                    className="product__amount-input"
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={handleAmount}
                  />{" "}
                  g
                </div>
              </label>
              <button
                onClick={() => {
                  if (productId) addProductToList(productId);
                }}
                className="product__btn"
                type="button"
              >
                Dodaj do listy
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};
