import { useDispatch } from "react-redux";
import { setSelectedOrderId } from "../store"; 
import { useOrderActions } from "../hooks/useOrderActions";
import OrderCard from "../components/OrderCard";
import SelectedOrderProducts from "../components/SelectedOrderProducts";
import DeleteOrderModal from "../components/DeleteOrderModal"; 
import "./OrdersPage.scss"; 

const OrdersPage = ({ pageTitle = "Приходы" }) => { 
  const dispatch = useDispatch(); 

  const {
    orders,
    products,
    selectedOrderId,
    selectedOrder,
    selectedOrderProducts,
    isModalOpen,
    itemToDelete,
    deleteType,
    handleOrderDeleteClick,
    handleProductDeleteClick,
    confirmDelete,
    handleAddProduct,
    handleAddOrder,
    handleCloseModal
  } = useOrderActions();

  const isGroupsPage = pageTitle === "Группы"; 
  const isCompressed = isGroupsPage && selectedOrderId; 

  return ( 
    <div className="orders-page container-fluid p-0"> 
      {/* Шапка */} 
      <div className="orders-page__header d-flex align-items-center gap-3 mb-4"> 
        <button className="orders-page__add-btn btn d-flex align-items-center justify-content-center rounded-circle p-0" onClick={handleAddOrder} > + </button> 
        <h2 className="orders-page__title m-0 fw-bold text-dark"> {pageTitle} / {orders.length} </h2> 
      </div> 

      <div className="orders-page__body row g-4 flex-nowrap m-0"> 
        {/* ЛЕВАЯ ЧАСТЬ: Карточки */} 
        <div className={`orders-page__column-left ${isCompressed ? "col-md-4 p-0" : "col-md-12 p-0"}`}> 
          <div className="d-flex flex-column gap-2 pe-2"> 
            {orders.map((order) => ( 
              <OrderCard 
                key={order.id}
                order={order}
                products={products}
                isGroupsPage={isGroupsPage}
                selectedOrderId={selectedOrderId}
                isCompressed={isCompressed}
                handleOrderDeleteClick={handleOrderDeleteClick}
              />
            ))} 
          </div> 
        </div> 

        {/* ПРАВАЯ ЧАСТЬ: Детали продуктов */} 
        {isCompressed && selectedOrder && ( 
          <div className="orders-page__column-right col-md-8 p-0 ps-3"> 
            <SelectedOrderProducts 
              selectedOrder={selectedOrder}
              selectedOrderProducts={selectedOrderProducts}
              handleAddProduct={handleAddProduct}
              handleProductDeleteClick={handleProductDeleteClick}
              onClose={() => dispatch(setSelectedOrderId(null))}
            />
          </div> 
        )} 
      </div> 

      {/* Окно удаления */}
      <DeleteOrderModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onConfirm={confirmDelete} 
        orderTitle={deleteType === "order" ? itemToDelete?.title : `Продукт: ${itemToDelete?.title}`} 
        products={deleteType === "order" ? selectedOrderProducts : (itemToDelete ? [itemToDelete] : [])} 
      /> 
    </div> 
  ); 
}; 

export default OrdersPage;