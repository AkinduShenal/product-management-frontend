import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CategoriesPage from './pages/CategoriesPage';
import ProductsPage from './pages/ProductsPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  </Router>
);

export default App;
