import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));