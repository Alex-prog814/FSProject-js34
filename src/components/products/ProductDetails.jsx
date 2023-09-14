import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../store/products/productsActions';
import { clearOneProductState } from '../../store/products/productsSlice';

const ProductDetails = () => {
    const { loading, oneProduct } = useSelector(state => state.products);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOneProduct({ id }));
        return () => dispatch(clearOneProductState());
    }, []);

    console.log(oneProduct);

  return (
    <div>
        {loading ? (
            <h3>Loading...</h3>
        ) : (
            <div>
                {oneProduct && (
                    <div>
                        <img src={oneProduct.image} alt={oneProduct.title} width="250" height="250" />
                        <h3>{ oneProduct.title }</h3>
                        <h3>{ oneProduct.price }</h3>
                    </div>
                )}
            </div>
        )}
    </div>
  )
}

export default ProductDetails