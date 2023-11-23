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
    isEditable,
    handleInput,
    updateInputs,
    handleEditSubmit,
    handleDelete,
    setInputValue,
    handleEdit,
    handleCancel,
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
            className={
              isEditable ? "product__name product__name--edit" : "product__name"
            }
            id="productName"
            type="text"
            name="productName"
            value={inputValue.productName}
            onChange={handleInput}
            disabled={!isEditable}
          />
          <p className="product__info">Wartości odżywcze na 100g</p>
          <label htmlFor="energy-value" className="product__box">
            <span>Wartość energetyczna</span>
            <div className="product__value-box">
              <input
                className={
                  isEditable
                    ? "product__input product__input--edit"
                    : "product__input"
                }
                id="energy-value"
                type="number"
                step="0.01"
                name="energyValue"
                value={inputValue.energyValue}
                onChange={handleInput}
                disabled={!isEditable}
              />
              <span>kcal</span>
            </div>
          </label>
          <label htmlFor="proteins" className="product__box">
            <span>Białko</span>
            <div className="product__value-box">
              <input
                className={
                  isEditable
                    ? "product__input product__input--edit"
                    : "product__input"
                }
                id="proteins"
                type="number"
                step="0.01"
                name="proteins"
                value={inputValue.proteins}
                onChange={handleInput}
                min={0}
                disabled={!isEditable}
              />
              <span>g</span>
            </div>
          </label>
          <label htmlFor="fats" className="product__box">
            <span>Tłuszcze</span>
            <div className="product__value-box">
              <input
                className={
                  isEditable
                    ? "product__input product__input--edit"
                    : "product__input"
                }
                id="fats"
                type="number"
                step="0.01"
                name="fats"
                value={inputValue.fats}
                onChange={handleInput}
                min={0}
                disabled={!isEditable}
              />
              <span>g</span>
            </div>
          </label>
          <label htmlFor="carbohydrates" className="product__box">
            <span>Węglowodany</span>
            <div className="product__value-box">
              <input
                className={
                  isEditable
                    ? "product__input product__input--edit"
                    : "product__input"
                }
                id="carbohydrates"
                type="number"
                step="0.01"
                name="carbohydrates"
                value={inputValue.carbohydrates}
                onChange={handleInput}
                min={0}
                disabled={!isEditable}
              />
              <span>g</span>
            </div>
          </label>
          {functionality === "edit" && (
            <>
              {!isEditable && user?.uid === product?.createdBy && (
                <button
                  type="button"
                  className="product__btn"
                  onClick={handleEdit}
                >
                  Edytuj produkt
                </button>
              )}
              {isEditable && user?.uid === product?.createdBy && (
                <button type="submit" className="product__btn">
                  Zapisz
                </button>
              )}
              {isEditable && user?.uid === product?.createdBy && (
                <button
                  type="button"
                  className="product__btn--cancel product__btn"
                  onClick={() => handleCancel(productId!)}
                >
                  Anuluj
                </button>
              )}
              {user?.uid === product?.createdBy && (
                <button
                  onClick={() => handleDelete(productId)}
                  type="button"
                  className="product__btn--delete product__btn"
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
                    step="0.01"
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
