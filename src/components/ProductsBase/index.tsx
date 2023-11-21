import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Product } from "../Product";
import { UserContext } from "../../context/UserContext";

import "./ProductBase.scss";
import { ProductsList } from "../ProductsList";

export const ProductsBase = () => {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const onClickProductPreview = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-base">
      <h1 className="product-base__title">Baza produktów</h1>
      {user ? (
        <Link className="product-base__link" to="/products/new">
          Dodaj nowy produkt
        </Link>
      ) : (
        <Link className="product-base__link" to="/login">
          Zaloguj się aby dodać nowy produkt
        </Link>
      )}

      <ProductsList onClickHandle={onClickProductPreview} />
      {productId && <Product functionality="edit" />}
    </div>
  );
};
