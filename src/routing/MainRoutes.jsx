import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductCreatePage from '../pages/ProductCreatePage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductUpdatePage from '../pages/ProductUpdatePage';
import RegisterPage from '../pages/RegisterPage';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/product-create" element={<ProductCreatePage />} />
        <Route path="/product-update/:id" element={<ProductUpdatePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  )
}

export default MainRoutes