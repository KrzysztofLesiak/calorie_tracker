import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { Product } from "../../../components/Product";
import { UserContext } from "../../../context/UserContext";
import { useTranslation } from "react-i18next";

import "./ProductBase.scss";
import { ProductsList } from "../../../components/ProductsList";

export const ProductsBase = () => {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onClickProductPreview = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="product-base">
      <h1 className="product-base__title">{t("navProductBase")}</h1>
      {user ? (
        <Link className="product-base__link" to="/products/new">
          {t("addNewProduct")}
        </Link>
      ) : (
        <Link className="product-base__link" to="/login">
          {t("loginToAdd")}
        </Link>
      )}

      <ProductsList onClickHandle={onClickProductPreview} />
      {productId && <Product functionality="edit" />}
    </div>
  );
};
