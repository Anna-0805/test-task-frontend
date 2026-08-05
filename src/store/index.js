import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialOrders = [
  {
    id: 1,
    title: 'Order 1',
    date: '2017-06-29 12:09:33',
    description: 'desc',
  },
  {
    id: 2,
    title: 'Order 2',
    date: '2017-06-29 12:09:33',
    description: 'desc',
  },
  {
    id: 3,
    title: 'Order 3',
    date: '2017-06-29 12:09:33',
    description: 'desc',
  }
]

const initialProducts = [
  {
    id: 1,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 1,
    date: '2017-06-29 12:09:33'
  },
  {
    id: 2,
    serialNumber: 1234,
    isNew: 1,
    photo: 'pathToFile.jpg',
    title: 'Product 1',
    type: 'Monitors',
    specification: 'Specification 1',
    guarantee: {
      start: '2017-06-29 12:09:33',
      end: '2017-06-29 12:09:33'
    },
    price: [
      {value: 100, symbol: 'USD', isDefault: 0},
      {value: 2600, symbol: 'UAH', isDefault: 1}
    ],
    order: 2,
    date: '2017-06-29 12:09:33'
  }
]

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    entities: initialOrders,
    selectedOrderId: null
  },
  reducers: {
    removeOrder: (state, action) => {
      const orderIdToRemove = action.payload;
      state.entities = state.entities.filter(order => order.id !== orderIdToRemove);
      if (state.selectedOrderId === orderIdToRemove) {
        state.selectedOrderId = null;
      }
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId = state.selectedOrderId === action.payload ? null : action.payload;
    },
    
    addOrder: (state, action) => {
      state.entities = [...state.entities, action.payload];
    }
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    entities: initialProducts
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
      state.entities = [...state.entities, action.payload];
    }
  }
});


export const { removeOrder, setSelectedOrderId, addOrder } = ordersSlice.actions;
export const { removeProduct, removeProductsByOrderId, addProduct } = productsSlice.actions;

export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
    products: productsSlice.reducer
  }
});

export const selectOrders = (state) => state.orders.entities;
export const selectProducts = (state) => state.products.entities;
export const selectSelectedOrderId = (state) => state.orders.selectedOrderId;