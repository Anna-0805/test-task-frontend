import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  selectProducts,
  selectSelectedOrderId,
  setSelectedOrderId,
  removeOrder,
  removeProduct,
  addOrder,
  addProduct,
} from "../store";
import OrderCard from "../features/orders/components/OrderCard";
import DeleteOrderModal from "../features/orders/components/DeleteOrderModal";
import SelectedOrderProducts from "../features/orders/components/SelectedOrderProducts";
import "./OrdersPage.scss";

const OrdersPage = () => {
  const dispatch = useDispatch();


  const orders = useSelector(selectOrders);
  const products = useSelector(selectProducts);
  const selectedOrderId = useSelector(selectSelectedOrderId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  const selectedOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId);
  }, [orders, selectedOrderId]);

  const selectedOrderProducts = useMemo(() => {
    return products.filter((p) => p.order === selectedOrderId);
  }, [products, selectedOrderId]);

  const isCompressed = Boolean(selectedOrderId);

  const handleOrderDeleteClick = (e, order) => {
    e.stopPropagation();
    setItemToDelete(order);
    setDeleteType("order");
    setIsModalOpen(true);
  };

  const handleProductDeleteClick = (e, product) => {
    e.stopPropagation();
    setItemToDelete(product);
    setDeleteType("product");
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const targetId = Number(itemToDelete.id);

    if (deleteType === "order") {
      dispatch(removeOrder(targetId));
    } else if (deleteType === "product") {
      dispatch(removeProduct(targetId));
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
    setDeleteType("");
  };

  return (
    <div className="orders-page container-fluid p-0">
      <div className="orders-page__header d-flex align-items-center gap-3 mb-4">
        <button
          className="orders-page__add-btn btn d-flex align-items-center justify-content-center rounded-circle p-0"
          onClick={() => dispatch(addOrder())}
        >
          +
        </button>
        <h2 className="orders-page__title m-0 fw-bold text-dark">
          Delivery / {orders.length}
        </h2>
      </div>

      <div className="orders-page__body row g-4 flex-nowrap m-0">
        <div
          className={`orders-page__column-left ${
            isCompressed ? "col-md-4 p-0" : "col-md-12 p-0"
          }`}
        >
          <div className="d-flex flex-column gap-2 pe-2">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                products={products}
                selectedOrderId={selectedOrderId}
                isCompressed={isCompressed}
                handleOrderDeleteClick={handleOrderDeleteClick}
              />
            ))}
          </div>
        </div>

        {isCompressed && selectedOrder && (
          <div className="orders-page__column-right col-md-8 p-0 ps-3">
            <SelectedOrderProducts
              selectedOrder={selectedOrder}
              selectedOrderProducts={selectedOrderProducts}
              handleAddProduct={() => dispatch(addProduct(selectedOrderId))}
              handleProductDeleteClick={handleProductDeleteClick}
              onClose={() => dispatch(setSelectedOrderId(null))}
            />
          </div>
        )}
      </div>

      <DeleteOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={confirmDelete}
        orderTitle={
          deleteType === "order"
            ? itemToDelete?.title
            : `Продукт: ${itemToDelete?.title}`
        }
        products={
          deleteType === "order"
            ? selectedOrderProducts
            : itemToDelete
              ? [itemToDelete]
              : []
        }
      />
    </div>
  );
};

export default OrdersPage;
