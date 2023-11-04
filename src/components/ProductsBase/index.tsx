import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

export const ProductsBase = () => {
  const { productsList } = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="product-base">
      <Link to="/products/new">Dodaj nowy produkt</Link>
      {productsList.length > 0 ? (
        <ul>
          {productsList.map((product) => {
            return (
              <li
                key={product.id}
                onClick={() => navigate(`/products/${product.id}`)}
              >
                {product.id} {product.productName}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Brak produktów na liście</p>
      )}
    </div>
  );
};
