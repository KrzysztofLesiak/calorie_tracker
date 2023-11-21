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
      <div className="tracker__summary">
        <span>{product.energyValue} kcal</span>
        <span>B: {product.proteins}</span>
        <span>W: {product.carbohydrates} </span>
        <span>T: {product.fats}</span>
      </div>
    </li>
  );
};
