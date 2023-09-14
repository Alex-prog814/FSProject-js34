import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import RegisterPage from '../pages/RegisterPage';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
    </Routes>
  )
}

export default MainRoutes