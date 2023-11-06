import { Link, useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductPreview } from "../ProductPreview";
import { Product } from "../Product";
import { UserContext } from "../../context/UserContext";

import "./ProductBase.scss";
import { useSearch } from "../../hooks/useSearch";

export const ProductsBase = () => {
  const { productId } = useParams();
  const { pathname, search } = useLocation();
  const { productsList } = useContext(ProductContext);
  const { user } = useContext(UserContext);
  const { searchInput, searchValue, handleSearch } = useSearch(
    pathname,
    search
  );

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
      <input
        className="product-base__search"
        type="search"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Wyszukaj"
      />
      {productsList.length > 0 ? (
        <ul className="product-base__list">
          {productsList
            .filter((product) =>
              product.productName
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            )
            .map((product) => {
              return <ProductPreview key={product.id} product={product} />;
            })}
        </ul>
      ) : (
        <p className="product-base__empty">Brak produktów na liście</p>
      )}
      {productId && <Product />}
    </div>
  );
};
