import React, { useState, useEffect } from 'react';
import { createProduct, getCategories } from '../../store/products/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ProductCreate = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null
  });
  const { categories } = useSelector(state => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      <h3>Add Product</h3>
      <input type="text" placeholder="Title" onChange={(e) => setProduct({ ...product, title: e.target.value })} />
      <input type="text" placeholder="Description" onChange={(e) => setProduct({ ...product, description: e.target.value })} />
      <input type="text" placeholder="Price" onChange={(e) => setProduct({ ...product, price: e.target.value })} />

      <select onChange={(e) => setProduct({ ...product, category: e.target.value })}>
        <option>Choose category</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.title}</option>
        ))}
      </select>

      <input type="file" accept="image/*" onChange={(e) => setProduct({ ...product, image: e.target.files[0] })} /> <br />

      <button onClick={() => dispatch(createProduct({ product, navigate }))}>Create</button>
    </div>
  )
}

export default ProductCreate