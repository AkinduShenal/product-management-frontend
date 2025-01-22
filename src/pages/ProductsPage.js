import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../api/api';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch products when the component loads
  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from the API
  const loadProducts = () => {
    fetchProducts()
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  // Handle product deletion
  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => loadProducts())
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductForm
        onSuccess={loadProducts}
        editingProduct={editingProduct}
        onCancelEdit={() => setEditingProduct(null)}
      />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => setEditingProduct(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
