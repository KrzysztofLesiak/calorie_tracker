import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductPreview } from "../ProductPreview";
import { useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";

type ProductsListProps = {
  onClickHandle: (id: string) => void;
};

export const ProductsList = ({ onClickHandle }: ProductsListProps) => {
  const { productsList } = useContext(ProductContext);
  const { pathname, search } = useLocation();

  const { searchInput, searchValue, handleSearch } = useSearch(
    pathname,
    search
  );

  return (
    <>
      <input
        className="product-base__search"
        type="search"
        value={decodeURI(searchInput)}
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
              return (
                <ProductPreview
                  key={product.id}
                  product={product}
                  onClickHandle={onClickHandle}
                />
              );
            })}
        </ul>
      ) : (
        <p className="product-base__empty">Brak produktów na liście</p>
      )}
    </>
  );
};
