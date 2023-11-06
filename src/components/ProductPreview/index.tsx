import { useNavigate } from "react-router-dom";
import { ProductType } from "../../context/ProductContext";

import "./ProductPreview.scss";

type ProductPreviewProps = {
  product: ProductType;
};

export const ProductPreview = ({ product }: ProductPreviewProps) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/products/${product.id}`)}
      className="product-preview"
    >
      <p className="product-preview__name">{product.productName}</p>
      <p className="product-preview__details">Kliknij aby zobaczyć szczegóły</p>
    </li>
  );
};
