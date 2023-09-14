import React, { useEffect } from 'react';
import { getProducts } from '../../store/products/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem';

const ProductsList = () => {
  const { products, loading } = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList