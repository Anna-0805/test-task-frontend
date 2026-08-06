import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts, selectOrders } from '../store'; 
import { useOrderActions } from '../hooks/useOrderActions';
import DeleteOrderModal from '../features/orders/components/DeleteOrderModal';
import './ProductsPage.scss'; 
import ProductList from '../features/products/components/ProductList';

const ProductsPage = () => {
  const products = useSelector(selectProducts);
  const orders = useSelector(selectOrders);
  
  const [selectedType, setSelectedType] = useState('All');

  const {
    isModalOpen,
    itemToDelete,
    handleProductDeleteClick,
    confirmDelete,
    handleCloseModal
  } = useOrderActions();
  
  const productTypes = ['All', ...new Set(products.map(p => p.type))];
  
  const filteredProducts = selectedType === 'All' 
    ? products 
    : products.filter(p => p.type === selectedType);

  return (
    <div className="products-page">
      <div className="products-page__header d-flex align-items-center gap-5 mb-4">
        <h2 className="products-page__title fw-bold text-dark m-0">
          Продукты / {filteredProducts.length}
        </h2>
        
        <div className="d-flex align-items-center gap-4">
          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-medium">Тип:</span>
            <select 
              className="products-page__select form-select form-select-sm bg-white border-secondary-subtle"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {productTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'All' ? 'Все' : type}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="text-secondary small fw-medium">Спецификация:</span>
            <select className="products-page__select form-select form-select-sm bg-white border-secondary-subtle" disabled>
              <option>По умолчанию</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-page__table-wrapper w-100 overflow-auto border rounded">
        <ProductList 
    filteredProducts={filteredProducts}
    orders={orders}
    handleProductDeleteClick={handleProductDeleteClick}
  />
      </div>

      <DeleteOrderModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onConfirm={confirmDelete} 
        orderTitle={itemToDelete ? `Продукт: ${itemToDelete.title}` : ""} 
        products={itemToDelete ? [itemToDelete] : []} 
      />
    </div>
  );
};

export default ProductsPage;