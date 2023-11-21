import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductPreview } from "../ProductPreview";
import { useSearch } from "../../hooks/useSearch";

import "./ProductList.scss";

type ProductsListProps = {
  onClickHandle: (id: string) => void;
};

export const ProductsList = ({ onClickHandle }: ProductsListProps) => {
  const { productsList } = useContext(ProductContext);
  const { searchInput, searchValue, handleSearch } = useSearch();

  return (
    <>
      <input
        className="product-list__search"
        type="search"
        value={decodeURI(searchInput)}
        onChange={handleSearch}
        placeholder="Wyszukaj"
      />
      {productsList.length > 0 ? (
        <ul className="product-list__list">
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
        <p className="product-list__empty">Brak produktów na liście</p>
      )}
    </>
  );
};
