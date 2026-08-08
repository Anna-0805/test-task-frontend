import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedOrderId } from "../../../store";
import {
  calculateOrderTotal,
  getOrderProductsCount,
  formatDate,
} from "../../../utils/helpers";

import { Order, Product } from "../../../types/types";


interface OrderCardProps {
  order: Order;
  products: Product[];
  selectedOrderId: string | number | null; 
  isCompressed: boolean;
  handleOrderDeleteClick: (e: React.MouseEvent<HTMLButtonElement>, order: Order) => void;
  pageTitle?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  products,
  selectedOrderId,
  isCompressed,
  handleOrderDeleteClick,
  pageTitle,
}) => {
  const dispatch = useDispatch();
  const count = getOrderProductsCount(order.id, products);
  const totalUSD = calculateOrderTotal(order.id, products, "USD");
  const totalUAH = calculateOrderTotal(order.id, products, "UAH");
  const dateString = order.date instanceof Date ? order.date.toISOString() : String(order.date);
  const { short: dateShort, full: dateFull } = formatDate(dateString);
  const isActive = selectedOrderId === order.id;

  const handleCardClick = () => {
    if (pageTitle === "Groups") {
      dispatch(setSelectedOrderId(order.id));
    }
  };

  return (
    <div
      className={`orders-page__card d-flex flex-row align-items-center justify-content-between position-relative ${
        isActive ? "orders-page__card--active" : ""
      } ${isCompressed ? "orders-page__card--compressed" : ""}`}
      onClick={handleCardClick}
    >
      {!isCompressed && (
        <div className="orders-page__card-title fw-medium text-secondary text-decoration-underline text-start">
          {order.title}
        </div>
      )}
      <div className="orders-page__card-menu d-flex align-items-center gap-3">
        <button className="orders-page__menu-btn btn d-flex align-items-center justify-content-center p-0 border border-secondary-subtle rounded-circle">
          ☰
        </button>
        <div>
          <div className="fw-bold text-dark h5 m-0">{count}</div>
          <div className="orders-page__menu-subtext text-muted small text-lowercase">
            products
          </div>
        </div>
      </div>
      <div className="orders-page__card-date text-center small text-secondary">
        <div className="orders-page__date-short text-muted">{dateShort}</div>
        <div className="orders-page__date-full text-dark">{dateFull}</div>
      </div>
      {!isCompressed && (
        <div className="orders-page__card-price text-start">
          <div className="orders-page__price-usd text-muted small">
            {totalUSD} $
          </div>
          <div className="orders-page__price-uah fw-bold text-dark">
            {totalUAH} UAH
          </div>
        </div>
      )}
      {!isCompressed && (
        <div className="orders-page__card-delete text-end">
          <button
            className="btn btn-link text-secondary p-1 opacity-75 hover-opacity-100 text-decoration-none fs-5"
            onClick={(e) => handleOrderDeleteClick(e, order)}
          >
            <img src="/trash.svg" alt="trash" />
          </button>
        </div>
      )}
      {isCompressed && isActive && (
        <div className="orders-page__card-arrow d-flex align-items-center justify-content-center">
          ❯
        </div>
      )}
    </div>
  );
};

export default OrderCard;