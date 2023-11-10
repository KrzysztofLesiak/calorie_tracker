import { ProductType } from "../../context/ProductContext";

import "./ProductPreview.scss";

type ProductPreviewProps = {
  product: ProductType;
  onClickHandle: (id: string) => void;
};

export const ProductPreview = ({
  product,
  onClickHandle,
}: ProductPreviewProps) => {
  return (
    <li onClick={() => onClickHandle(product.id!)} className="product-preview">
      <p className="product-preview__name">{product.productName}</p>
      <p className="product-preview__details">Kliknij aby zobaczyć szczegóły</p>
    </li>
  );
};
