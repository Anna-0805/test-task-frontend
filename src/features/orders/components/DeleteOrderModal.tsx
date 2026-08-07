
import React from "react";

interface Product {
  id?: string | number;
  photo?: string;
  title?: string;
  serialNumber?: string | number;
}

interface DeleteOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderTitle?: string;
  products?: Product[];
}

const DeleteOrderModal: React.FC<DeleteOrderModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  orderTitle,
  products = [],
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div
        className="orders-popup modal fade show d-block"
        tabIndex={-1} 
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered orders-popup__dialog">
          <div className="modal-content border-0 shadow position-relative bg-white orders-popup__content">
            <button
              className="orders-popup__close-btn btn position-absolute"
              onClick={onClose}
              aria-label="Закрыть"
            >
              ✕
            </button>
            <div className="modal-body p-4 bg-white orders-popup__body">
              <h5 className="orders-popup__title fw-bold text-dark mb-4">
                Are you sure you want to delete {orderTitle || "this delivery"}?
              </h5>
              <div className="orders-popup__products-list d-flex flex-column gap-2">
                {products.map((product, index) => (
                  <div
                    key={`${product?.id || "prod"}-${index}`}
                    className="orders-popup__product-row d-flex align-items-center justify-content-between py-2 border-bottom border-light"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-success small">●</span>
                      <img
                        src={product?.photo || "/logo.png"}
                        alt={product?.title || "Product"}
                        className="orders-popup__product-img"
                      />
                      <div>
                        <div className="orders-popup__product-name fw-medium text-dark small text-decoration-underline">
                          {product?.title}
                        </div>
                        <div className="text-muted small">
                          SN: {product?.serialNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="orders-popup__footer d-flex justify-content-end align-items-center p-3 gap-3">
              <button
                className="orders-popup__cancel-btn btn btn-link text-secondary text-uppercase fw-bold text-decoration-none small p-0"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="orders-popup__delete-btn btn btn-white bg-white text-danger text-uppercase fw-bold rounded-pill px-4 py-2 d-flex align-items-center gap-2"
                onClick={onConfirm}
              >
                <span className="orders-popup__delete-icon">
                  <img src="/trash.svg" alt="trash" className="orders-popup__trash-img" />
                </span>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteOrderModal;