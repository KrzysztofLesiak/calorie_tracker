import { useTranslation } from "react-i18next";
import { ProductType } from "../../context/ProductContext";

import "./ProductPreview.scss";

type ProductPreviewProps = {
  product: ProductType;
  onClickHandle: (id: string) => void;
};

export const ProductPreview = ({
  product,
  onClickHandle
}: ProductPreviewProps) => {
  const { t } = useTranslation();
  return (
    <li onClick={() => onClickHandle(product.id!)} className="product-preview">
      <p className="product-preview__name">{product.productName}</p>
      <div className="product-preview__summary">
        <span>{product.energyValue} kcal</span>
        <span>
          {t("proteins").slice(0, 1)}: {product.proteins}
        </span>
        <span>
          {t("carbohydrates").slice(0, 1)}: {product.carbohydrates}{" "}
        </span>
        <span>
          {t("fats").slice(0, 1)}: {product.fats}
        </span>
      </div>
    </li>
  );
};
