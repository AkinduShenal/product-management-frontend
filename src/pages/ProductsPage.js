import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '../api/api';
import Loader from '../components/Loader';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products and categories on component mount
  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productResponse, categoryResponse]) => {
        console.log('Fetched Products:', productResponse.data); // Debugging fetched products
        console.log('Fetched Categories:', categoryResponse.data); // Debugging fetched categories
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Add a new product
  const handleAddProduct = (data) => {
    createProduct(data)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  // Update an existing product
  const handleUpdateProduct = (id, data) => {
    updateProduct(id, data)
      .then(() => {
        setProducts(products.map((prod) => (prod.id === id ? { ...prod, ...data } : prod)));
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((prod) => prod.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  if (loading) return <Loader />; // Show loader while fetching data

  return (
    <div>
      <h1>Products</h1>
      <ProductForm categories={categories} onSubmit={handleAddProduct} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name || 'Unnamed Product'} - {product.description || 'No description available'} - 
            ${typeof product.price === 'number' || !isNaN(product.price) ? parseFloat(product.price).toFixed(2) : 'N/A'}
            <button onClick={() => handleUpdateProduct(product.id, { name: 'Updated Name' })}>
              Edit
            </button>
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
