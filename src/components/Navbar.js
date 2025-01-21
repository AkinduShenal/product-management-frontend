import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f5f5f5', marginBottom: '20px' }}>
      <ul style={{ display: 'flex', listStyleType: 'none', justifyContent: 'space-around' }}>
        <li>
          <Link to="/products" style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
        </li>
        <li>
          <Link to="/categories" style={{ textDecoration: 'none', color: '#333' }}>Categories</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
