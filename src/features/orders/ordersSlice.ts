import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Order } from "../../types/types";

const API_URL = "/api/orders";

interface OrdersState {
  entities: Order[];
  selectedOrderId: string | number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: OrdersState = {
  entities: [],
  selectedOrderId: null,
  status: "idle",
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error loading orders");
    return (await response.json()) as Order[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
  export const deleteOrderOnServer = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId: number | string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting the order");
      
      const data = await response.json();
      if (data.success) {
        return orderId;
      } else {
        throw new Error(data.message || "Failed to delete the order.");
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
  );

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
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
        title: `Long name of the order ${nextId}`,
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
        description: "New test order",
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      
      .addCase(deleteOrderOnServer.fulfilled, (state, action: PayloadAction<number | string>) => {
        const orderIdToRemove = action.payload;
        state.entities = state.entities.filter((order) => order.id !== orderIdToRemove);
        if (state.selectedOrderId === orderIdToRemove) {
          state.selectedOrderId = null;
        }
      });
  },
});

export const { setSelectedOrderId, addOrder } = ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) => state.orders.entities;
export const selectSelectedOrderId = (state: { orders: OrdersState }) => state.orders.selectedOrderId;
export const selectOrdersStatus = (state: { orders: OrdersState }) => state.orders.status;

export default ordersSlice.reducer;