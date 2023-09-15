import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getOneProduct, updateProduct } from '../../store/products/productsActions';
import { clearOneProductState } from '../../store/products/productsSlice';

const ProductUpdate = () => {
  const { oneProduct, loading, categories } = useSelector(state => state.products);
  const [product, setProduct] = useState(oneProduct);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getOneProduct({ id }));
    return () => dispatch(clearOneProductState());
  }, []);

  useEffect(() => {
    if(oneProduct) {
      setProduct({ ...oneProduct, category: oneProduct.category.id });
    };
  }, [oneProduct]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {product && (
            <div>
              <h3>Edit Product</h3>
              <input type="text" placeholder="Title" value={product.title} onChange={(e) => setProduct({ ...product, title: e.target.value })} />
              <input type="text" placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
              <input type="text" placeholder="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
        
              <select value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                <option>Choose new category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.title}</option>
                ))}
              </select>
                  
              <p>IMAGE BEFORE:</p>
              <img src={oneProduct.image} alt={product.title} width="150" height="150" />

              <input type="file" accept="image/*" onChange={(e) => setProduct({ ...product, image: e.target.files[0] })} /> <br />
        
              <button onClick={() => dispatch(updateProduct({ product, navigate }))}>Save chnages</button>
              </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductUpdate