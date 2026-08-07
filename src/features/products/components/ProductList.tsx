import React from "react";
import ProductItem from "./ProductItem";
import { Product, Order } from "../../../types/types";

interface ProductListProps {
  filteredProducts: Product[];
  orders: Order[];
  handleProductDeleteClick: (e: React.MouseEvent<HTMLButtonElement>, product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  filteredProducts,
  orders,
  handleProductDeleteClick,
}) => {
  return (
    <div className="products-page__list d-flex flex-column">
      {filteredProducts.map((product) => {
        const matchedOrder = orders.find((o) => o.id === product.order);
        return (
          <ProductItem
            key={product.id}
            product={product}
            orderTitle={matchedOrder ? matchedOrder.title : undefined} 
            onDeleteClick={handleProductDeleteClick}
          />
        );
      })}
    </div>
  );
};

export default ProductList;