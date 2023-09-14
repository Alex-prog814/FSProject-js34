import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../store/products/productsSlice';
import { getProducts } from '../../store/products/productsActions';

export default function ProductsPagination() {
  const { currentPage, totalPages } = useSelector(state => state.products);

  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    dispatch(changePage({ page: value }));
    dispatch(getProducts());
  };

  return (
    <Stack spacing={2}>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} />
    </Stack>
  );
}