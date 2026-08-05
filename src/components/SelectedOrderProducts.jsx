

 const SelectedOrderProducts = ({ 
  selectedOrder, 
  selectedOrderProducts, 
  handleAddProduct, 
  handleProductDeleteClick, 
  onClose 
}) => {
  return (
    <div className="orders-page__details card border-0 shadow-sm p-4 bg-white"> 
      <button className="orders-page__details-close-btn btn position-absolute" onClick={onClose}> ✕ </button> 
      
      <h4 className="orders-page__details-title fw-bold text-dark mb-3 text-start"> {selectedOrder.title} </h4> 
      
      <div className="orders-page__add-product-wrapper d-flex align-items-center gap-2 mb-4" onClick={handleAddProduct}> 
        <button className="orders-page__add-btn orders-page__add-btn--small btn d-flex align-items-center justify-content-center rounded-circle p-0"> + </button> 
        <span className="orders-page__add-product-text text-success small fw-bold"> Добавить продукт </span> 
      </div> 
      
      {/* Список продуктів */} 
      <div className="d-flex flex-column gap-2"> 
        {selectedOrderProducts.map((product) => ( 
          <div key={product.id} className="orders-page__product-item d-flex align-items-center justify-content-between py-2 border-bottom border-light"> 
            <div className="d-flex align-items-center gap-4 flex-grow-1"> 
              <span className="text-success p-cell__dot--small">●</span> 
              <img src={product.photo || '/logo.png'} alt={product.title} className="orders-page__product-img-thumb" /> 
              <div> 
                <div className="orders-page__product-title-text fw-medium text-dark text-decoration-underline"> {product.title} </div> 
                <div className="text-muted orders-page__product-sn-text"> SN: {product.serialNumber} </div> 
              </div> 
            </div> 
            <div className="text-success small fw-medium px-4 orders-page__product-status-text"> Свободен </div> 
            
            <button 
              className="btn btn-link text-secondary p-1 border-0 bg-transparent opacity-50 orders-page__product-delete-btn"
              onClick={() => handleProductDeleteClick(product)}
            > 
              <img src="/trash.svg" alt="trash" /> 
            </button> 
          </div> 
        ))} 
      </div> 
    </div>
  );
};

export default SelectedOrderProducts;