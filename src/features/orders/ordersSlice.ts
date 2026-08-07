import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialOrders } from "../../utils/mockData";
import { Order } from "../../types/types";

interface OrdersState {
  entities: Order[];
  selectedOrderId: string | number | null;
}

const initialState: OrdersState = {
  entities: initialOrders as Order[],
  selectedOrderId: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    removeOrder: (state, action: PayloadAction<number | string>) => {
      const orderIdToRemove = action.payload;
      state.entities = state.entities.filter(
        (order) => order.id !== orderIdToRemove
      );
      if (state.selectedOrderId === orderIdToRemove) {
        state.selectedOrderId = null;
      }
    },
    
    setSelectedOrderId: (state, action: PayloadAction<number | string | null>) => {
      state.selectedOrderId = state.selectedOrderId === action.payload ? null : action.payload;
    },
    
    addOrder: (state) => {
      const maxId = state.entities.reduce((max, o) => {
        const currentId = Number(o.id);
        return isFinite(currentId) && currentId > max ? currentId : max;
      }, 0);

      const nextId = maxId + 1;
      
      state.entities.push({
        id: nextId,
        title: `Long name of the delivery ${nextId}`,
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        description: "New test delivery",
      });
    },
  },
});

export const { removeOrder, setSelectedOrderId, addOrder } = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.entities;
export const selectSelectedOrderId = (state: { orders: OrdersState }) => state.orders.selectedOrderId;

export default ordersSlice.reducer;