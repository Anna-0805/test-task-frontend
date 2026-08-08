import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialProducts } from "../../utils/mockData";
import { removeOrder } from "../orders/ordersSlice";
import { Product } from "../../types/types";

interface ProductsState {
  entities: Product[];
}

const initialState: ProductsState = {
  entities: initialProducts as Product[],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeProduct: (state, action: PayloadAction<number | string>) => {
      const productIdToRemove = action.payload;
      state.entities = state.entities.filter(
        (product) => product.id !== productIdToRemove
      );
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
    builder.addCase(removeOrder, (state, action) => {
      const orderId = action.payload;
      state.entities = state.entities.filter(
        (product) => product.order !== orderId
      );
    });
  },
});

export const { removeProduct, addProduct } = productsSlice.actions;

export const selectProducts = (state: { products: ProductsState }) => state.products.entities;

export default productsSlice.reducer;