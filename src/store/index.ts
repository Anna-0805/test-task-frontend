import { configureStore } from "@reduxjs/toolkit";
// @ts-ignore
import logger from "redux-logger";
import orderReducer from "../features/orders/ordersSlice";
import productReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
  },
     middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { 
  setSelectedOrderId, 
  addOrder, 
  selectOrders, 
  selectSelectedOrderId,
  fetchOrders,
  deleteOrderOnServer
} from "../features/orders/ordersSlice"; 


export {
  removeProduct,
  addProduct,
  selectProducts,
  fetchProducts
} from "../features/products/productsSlice";
