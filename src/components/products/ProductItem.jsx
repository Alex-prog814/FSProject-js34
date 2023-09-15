import React from 'react';
import { useNavigate } from 'react-router-dom';


const ProductItem = ({ product }) => {
    const navigate = useNavigate();

  return (
    <div>
        <span>{ product.title } </span>
        <span>{ product.category.title } </span>
        <span>${ product.price } </span>
        <span>{ product.likes } </span>
        <button onClick={() => navigate(`/products/${product.id}`)}>Details</button>
        {product.is_author && (
          <>
            <button onClick={() => navigate(`/product-update/${product.id}`)}>Edit</button>
            <button>Delete</button>
          </>
        )}
    </div>
  )
}

export default ProductItem