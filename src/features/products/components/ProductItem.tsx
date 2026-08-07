import React from "react";
import { Product, FormattedDate } from "../../../types/types";
import { formatDate } from "../../../utils/helpers";
import "./ProductItem.scss";

interface ProductItemProps{
  product: Product;
  orderTitle?: string;
  onDeleteClick?: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ 
  product, 
  orderTitle, 
  onDeleteClick 
}) => {
  const guaranteeStart = formatDate(product?.guarantee?.start);
  const guaranteeEnd = formatDate(product?.guarantee?.end);
  const productDate = formatDate(product?.date);

  const usdPrice = product?.price?.find((p) => p.symbol === "USD")?.value || 0;
  const uahPrice = (
    product?.price?.find((p) => p.symbol === "UAH")?.value || 0
  ).toFixed(2);

  const statusText = product?.isNew ? "free" : "In repair";

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onDeleteClick) {
      onDeleteClick(e, product);
    }
  };

  return (
    <div className="product-row-item card border-0 shadow-sm bg-white mb-2 d-flex flex-row align-items-center">
      <div className="p-cell p-cell--status text-center">
        <span className={`${product?.isNew ? "text-success" : "text-dark"} p-cell__dot`}>
          ●
        </span>
      </div>
      <div className="p-cell p-cell--photo text-center">
        <img src={product?.photo || "/logo.png"} alt={product?.title} className="p-cell__img" />
      </div>
      <div className="p-cell p-cell--info text-start">
        <div className="p-cell__title text-dark text-decoration-underline">
          {product?.title}
        </div>
        <div className="text-muted p-cell__subtext">
          SN: {product?.serialNumber}
        </div>
      </div>
      <div className={`p-cell p-cell--status-text text-start ${product?.isNew ? "text-success" : "text-danger"}`}>
        {statusText}
      </div>
      <div className="p-cell p-cell--guarantee text-start d-flex flex-column justify-content-center">
        <div className="p-cell__guarantee-row">
          <span className="text-muted me-1">с</span>
          <span className="text-dark fw-medium">
            {guaranteeStart?.full || "—"}
          </span>
        </div>
        <div className="p-cell__guarantee-row">
          <span className="text-muted me-1">по</span>
          <span className="text-dark fw-medium">
            {guaranteeEnd?.full || "—"}
          </span>
        </div>
      </div>
      <div className="p-cell p-cell--spec text-center text-muted">
        {product?.isNew ? "new" : "used"}
      </div>
      <div className="p-cell p-cell--price text-start">
        <div className="text-muted p-cell__subtext">{usdPrice} $</div>
        <div className="fw-bold text-dark p-cell__main-text">
          {uahPrice} UAH
        </div>
      </div>
      <div className="p-cell p-cell--group text-secondary text-start">
        <span className="text-decoration-underline text-dark">
          {orderTitle || "Long Long Long Group Name"}
        </span>
      </div>
      <div className="p-cell p-cell--user text-secondary text-start">
        <span className={product?.userName ? "text-decoration-underline text-dark" : "text-dark"}>
          {product?.userName || "Alexander Khristorozhdestvensky"}
        </span>
      </div>
      <div className="p-cell p-cell--order text-secondary text-start">
        {orderTitle ? (
          <span className="text-decoration-underline text-dark">
            {orderTitle}
          </span>
        ) : (
          "—"
        )}
      </div>
      <div className="p-cell p-cell--order-date text-center text-secondary">
        <div className="text-muted p-cell__subtext">
          {productDate?.short || "—"}
        </div>
        <div className="text-dark p-cell__main-text">
          {productDate?.full || "—"}
        </div>
      </div>
      <div className="p-cell p-cell--delete">
        <button 
          className="btn btn-link text-secondary p-0 m-0 border-0 p-cell__delete-btn" 
          onClick={handleDeleteClick}
        >
          <img src="/trash.svg" alt="trash" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;