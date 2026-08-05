import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ filteredProducts, orders, handleProductDeleteClick }) => { 
  return (
    <div className="products-page__list d-flex flex-column">
      {filteredProducts.map(product => {
        const matchedOrder = orders.find(o => o.id === product.order);
        
        return (
          <ProductItem 
            key={product.id} 
            product={product} 
            orderTitle={matchedOrder ? matchedOrder.title : null} 
            onDeleteClick={(e) => handleProductDeleteClick(e, product)} 
          />
        );
      })}
    </div>
  );
};

export default ProductList;