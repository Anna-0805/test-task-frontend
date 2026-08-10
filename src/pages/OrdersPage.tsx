import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  selectProducts,
  selectSelectedOrderId,
  setSelectedOrderId,
  deleteOrderOnServer,
  removeProduct,
  addOrder,
  addProduct,
} from "../store";
import OrderCard from "../features/orders/components/OrderCard";
import DeleteOrderModal from "../features/orders/components/DeleteOrderModal";
import SelectedOrderProducts from "../features/orders/components/SelectedOrderProducts";
import { Order, Product } from "../types/types";
import { AppDispatch } from "../store";
import "./OrdersPage.scss";

type DeleteType = "order" | "product" | "";

interface OrdersPageProps {
  pageTitle?: string;
  searchQuery: string; 
}

const OrdersPage: React.FC<OrdersPageProps> = ({ pageTitle, searchQuery }) => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders) as Order[];
  const products = useSelector(selectProducts) as Product[];
  const selectedOrderId = useSelector(selectSelectedOrderId) as string | number | null;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<Order | Product | null>(null);
  const [deleteType, setDeleteType] = useState<DeleteType>("");


  useEffect(() => {
    dispatch(setSelectedOrderId(null));

     return () => {
      dispatch(setSelectedOrderId(null));
    };
  }, [pageTitle, dispatch]);

   const filteredOrders = useMemo(() => {
     return orders.filter((order) => {
       if (!order || typeof order.title !== "string") {
         return false;
         }
       return order.title.toLowerCase().includes((searchQuery || "").toLowerCase());
  });
  }, [orders, searchQuery]);

    const selectedOrder = useMemo(() => {
    return orders.find((o) => o.id === selectedOrderId);
  }, [orders, selectedOrderId]);

  const selectedOrderProducts = useMemo(() => {
    return products.filter((p) => p.order === selectedOrderId);
  }, [products, selectedOrderId]);

  const isCompressed = pageTitle === "Groups" && Boolean(selectedOrderId);

  const handleOrderDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, order: Order) => {
    e.stopPropagation();
    setItemToDelete(order);
    setDeleteType("order");
    setIsModalOpen(true);
  };

  const handleProductDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation();
    setItemToDelete(product);
    setDeleteType("product");
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const targetId = Number(itemToDelete.id);

    if (deleteType === "order") {
      dispatch(deleteOrderOnServer(targetId));
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
    <div className="orders-page container-fluid p-0 page-animate">
      <div className="orders-page__header d-flex align-items-center gap-3 mb-4">
        <button
          className="orders-page__add-btn btn d-flex align-items-center justify-content-center rounded-circle p-0"
          onClick={() => dispatch(addOrder())}
        >
          +
        </button>
        <h2 className="orders-page__title m-0 fw-bold text-dark">
          {pageTitle || "Order"} / {filteredOrders.length}
        </h2>
      </div>
      
      <div className="orders-page__body row g-4 flex-nowrap m-0">
        <div
          className={`orders-page__column-left ${
            isCompressed ? "col-md-4 p-0" : "col-md-12 p-0"
          }`}
        >
          <div className="d-flex flex-column gap-2 pe-2">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                products={products}
                selectedOrderId={selectedOrderId}
                isCompressed={isCompressed}
                handleOrderDeleteClick={handleOrderDeleteClick}
                pageTitle={pageTitle}
              />
              ))
            ) : (
            <div className="p-4 text-center text-muted border rounded bg-white">
                No orders found matching your request.
              </div>
            )}
          </div>
        </div>
        {isCompressed && selectedOrder && (
          <div className="orders-page__column-right col-md-8 p-0 ps-3">
            <SelectedOrderProducts
              selectedOrder={selectedOrder}
              selectedOrderProducts={selectedOrderProducts}
              handleAddProduct={() => {
                if (selectedOrderId !== null) {
                  dispatch(addProduct(selectedOrderId));
                }
              }}
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
            ? (itemToDelete as Order)?.title
            : itemToDelete
            ? `Products: ${(itemToDelete as Product)?.title}`
            : undefined
        }
        products={
          deleteType === "order"
            ? selectedOrderProducts
            : itemToDelete
            ? [itemToDelete as Product]
            : []
        }
      />
    </div>
  );
};

export default OrdersPage;