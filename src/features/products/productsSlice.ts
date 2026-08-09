import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteOrderOnServer } from "../orders/ordersSlice";
import { Product } from "../../types/types";

const API_URL = `${(import.meta as any).env?.VITE_API_BASE_URL || ""}/api/products`

interface ProductsState {
  entities: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = {
  entities: [],
  status: "idle",
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error loading products");
    return (await response.json()) as Product[];
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<number | string>) => {
      const productIdToRemove = action.payload;
      state.entities = state.entities.filter((product) => product.id !== productIdToRemove);
    },
    
      addProduct: (state, action: PayloadAction<number | string | null>) => {
      const selectedOrderId = action.payload;
      if (!selectedOrderId) return;
      
      const maxId = state.entities.reduce((max, p) => {
        const currentId = Number(p.id);
        return isFinite(currentId) && currentId > max ? currentId : max;
      }, 0);
        
        
      const nextProductId = maxId + 1;
      const randomSN = Math.floor(1000 + Math.random() * 9000);

      const nextPhoto = nextProductId % 2 === 0 ? "/Monitor1.jpg" : "/Monitor2.jpg";

      state.entities.push({
        id: nextProductId,
        serialNumber: randomSN,
        isNew: 1,
        photo: nextPhoto,
        title: `Product ${nextProductId}`,
        type: "Monitors",
        guarantee: {
          start: "2017-06-29 12:09:33",
          end: "2025-06-04 12:09:33",
        },
        price: [
          { value: 100, symbol: "USD", isDefault: 0 },
          { value: 2600, symbol: "UAH", isDefault: 1 },
        ],
        order: selectedOrderId,
        date: new Date().toISOString().replace("T", " ").substring(0, 19),
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteOrderOnServer.fulfilled, (state, action) => {
        const orderId = action.payload;
        state.entities = state.entities.filter((product) => product.order !== orderId);
      });
  },
});


export const { removeProduct, addProduct } = productsSlice.actions;

export const selectProducts = (state: { products: ProductsState }) => state.products.entities;
export const selectProductsStatus = (state: { products: ProductsState }) => state.products.status;

export default productsSlice.reducer;