import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import orderReducer from '../features/orders/ordersSlice';
import productReducer from '../features/products/productsSlice';


export const store = configureStore({
  reducer: {
    orders: orderReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (import.meta.env.DEV) {
      return getDefaultMiddleware().concat(logger);
    }
    return getDefaultMiddleware();
  }
});

export {
  removeOrder,
  setSelectedOrderId,
  addOrder,
  selectOrders,
  selectSelectedOrderId,
} from '../features/orders/ordersSlice';

export {
  removeProduct,
  removeProductsByOrderId,
  addProduct,
  selectProducts,
} from '../features/products/productsSlice';