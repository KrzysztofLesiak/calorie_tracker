import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ProductPreview } from "../ProductPreview";
import { Product } from "../Product";

export const ProductsBase = () => {
  const { productId } = useParams();
  const { productsList } = useContext(ProductContext);

  return (
    <div className="product-base">
      <Link to="/products/new">Dodaj nowy produkt</Link>
      {productsList.length > 0 ? (
        <ul>
          {productsList.map((product) => {
            return <ProductPreview key={product.id} product={product} />;
          })}
        </ul>
      ) : (
        <p>Brak produktów na liście</p>
      )}
      {productId && (
        <div className="modal">
          <Product />
        </div>
      )}
    </div>
  );
};
