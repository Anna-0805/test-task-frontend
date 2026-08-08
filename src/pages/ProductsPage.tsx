import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts, selectOrders, removeProduct } from "../store";
import DeleteOrderModal from "../features/orders/components/DeleteOrderModal";
import ProductList from "../features/products/components/ProductList";
import { Order, Product } from "../types/types";
import "./ProductsPage.scss";

interface ProductsPageProps {
  searchQuery: string;
}

const ProductsPage:  React.FC<ProductsPageProps> = ({ searchQuery }) => {
  const dispatch = useDispatch();
  
  const products = useSelector(selectProducts) as Product[];
  const orders = useSelector(selectOrders) as Order[];

  const [selectedType, setSelectedType] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const productTypes: string[] = ["All", ...new Set(products.map((p) => p.type))];

 const filteredProducts = products.filter((product) => {
   const matchesType = selectedType === "All" || product.type === selectedType;
   const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });
  
    const handleProductDeleteClick = (e: React.MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation();
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(removeProduct(Number(productToDelete.id)));
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div className="products-page">
      <div className="products-page__header d-flex align-items-center gap-5 mb-4">
        <h2 className="products-page__title fw-bold text-dark m-0">
          Products / {filteredProducts.length}
        </h2>
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-medium">Type:</span>
            <select
              className="products-page__select form-select form-select-sm bg-white border-secondary-subtle"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "All" ? "All" : type}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-medium">
              Specification:
            </span>
            <select
              className="products-page__select form-select form-select-sm bg-white border-secondary-subtle"
              disabled
            >
              <option>Default</option>
            </select>
          </div>
        </div>
      </div>
      <div className="products-page__table-wrapper w-100 overflow-auto border rounded">
         {filteredProducts.length > 0 ? (
           <ProductList
             filteredProducts={filteredProducts}
             orders={orders}
             handleProductDeleteClick={handleProductDeleteClick}
           />
          ) : (
          <div className="p-4 text-center text-muted">No products found matching your search.</div>
        )}
      </div>
      <DeleteOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={confirmDelete}
        orderTitle={productToDelete ? `Product: ${productToDelete.title}` : ""}
        products={productToDelete ? [productToDelete] : []}
      />
    </div>
  );
};

export default ProductsPage;