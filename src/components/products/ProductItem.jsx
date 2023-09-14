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
    </div>
  )
}

export default ProductItem