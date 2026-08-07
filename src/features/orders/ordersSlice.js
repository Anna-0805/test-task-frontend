import { createSlice } from "@reduxjs/toolkit";
import { initialOrders } from "../../utils/mockData";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    entities: initialOrders,
    selectedOrderId: null,
  },
  reducers: {
    removeOrder: (state, action) => {
      const orderIdToRemove = action.payload;
      state.entities = state.entities.filter(
        (order) => order.id !== orderIdToRemove,
      );
      if (state.selectedOrderId === orderIdToRemove) {
        state.selectedOrderId = null;
      }
    },
    setSelectedOrderId: (state, action) => {
      state.selectedOrderId =
        state.selectedOrderId === action.payload ? null : action.payload;
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

export const { removeOrder, setSelectedOrderId, addOrder } =
  ordersSlice.actions;

export const selectOrders = (state) => state.orders.entities;
export const selectSelectedOrderId = (state) => state.orders.selectedOrderId;

export default ordersSlice.reducer;
