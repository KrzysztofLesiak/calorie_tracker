import { useNavigate } from "react-router-dom";
import { ProductType } from "../../context/ProductContext";

type ProductPreviewProps = {
  product: ProductType;
};

export const ProductPreview = ({ product }: ProductPreviewProps) => {
  const navigate = useNavigate();

  return (
    <li onClick={() => navigate(`/products/${product.id}`)}>
      {product.productName}
    </li>
  );
};
