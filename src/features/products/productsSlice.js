import { createSlice } from '@reduxjs/toolkit';
import { initialProducts } from '../../utils/mockData';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    entities: initialProducts,
  },
  reducers: {
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      state.entities = state.entities.filter(product => product.id !== productIdToRemove);
    },
    removeProductsByOrderId: (state, action) => {
      const orderId = action.payload;
      state.entities = state.entities.filter(product => product.order !== orderId);
    },
    addProduct: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

export const { removeProduct, removeProductsByOrderId, addProduct } = productsSlice.actions;

export const selectProducts = (state) => state.products.entities;

export default productsSlice.reducer;