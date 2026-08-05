import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  selectOrders, 
  selectProducts, 
  selectSelectedOrderId, 
  setSelectedOrderId, 
  removeOrder, 
  removeProductsByOrderId,
  removeProduct,
  addProduct,
  addOrder
} from "../store";

export const useOrderActions = () => {
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

  const handleOrderDeleteClick = (e, order) => { 
    e.stopPropagation(); 
    setItemToDelete(order); 
    setDeleteType("order");
    setIsModalOpen(true); 
  }; 

   const handleProductDeleteClick = (e, product) => { 
    const actualProduct = product || (e && e.stopPropagation ? null : e);
    
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation(); 
    }

    if (actualProduct) {
      setItemToDelete(actualProduct); 
      setDeleteType("product");
      setIsModalOpen(true); 
    }
  };

  const confirmDelete = () => { 
    if (!itemToDelete || itemToDelete.id === undefined) return;

    const targetId = Number(itemToDelete.id);

    if (deleteType === "order") {
      dispatch(removeOrder(targetId)); 
      dispatch(removeProductsByOrderId(targetId)); 
      if (selectedOrderId === targetId) {
        dispatch(setSelectedOrderId(null));
      }
    } else if (deleteType === "product") {
      dispatch(removeProduct(targetId));
    }

    setIsModalOpen(false); 
    setItemToDelete(null); 
    setDeleteType("");
  }; 

  const handleAddProduct = () => {
    if (!selectedOrderId) return;
    
   
    const maxId = products.reduce((max, p) => {
      const currentId = Number(p.id);
      return isFinite(currentId) && currentId > max ? currentId : max;
    }, 0);
    const nextProductId = maxId + 1;

    const randomSN = Math.floor(1000 + Math.random() * 9000);

    const newProduct = {
      id: nextProductId,
      serialNumber: randomSN,
      isNew: 1,
      photo: "/logo.png",
      title: `Product ${selectedOrderProducts.length + 1}`,
      type: "Monitors",
      specification: "Specification 1",
      guarantee: {
        start: "2017-06-29 12:09:33",
        end: "2025-06-04 12:09:33"
      },
      price: [
        { value: 100, symbol: "USD", isDefault: 0 },
        { value: 2600, symbol: "UAH", isDefault: 1 }
      ],
      order: selectedOrderId,
      date: "2017-06-29 12:09:33"
    };
    dispatch(addProduct(newProduct));
  };

  const handleAddOrder = () => {
    const maxId = orders.reduce((max, o) => {
      const currentId = Number(o.id);
      return isFinite(currentId) && currentId > max ? currentId : max;
    }, 0);
    const nextId = maxId + 1;
    
    const newOrder = {
      id: nextId,
      title: `Длинное название прихода ${nextId}`,
      date: "2017-06-29 12:09:33",
      description: 'Новый тестовый приход'
    };
    dispatch(addOrder(newOrder));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
    setDeleteType("");
  };

  return {
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
  };
};