import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../api/api';
import Loader from '../components/Loader';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts().then((response) => {
      setProducts(response.data);
      setLoading(false);
    });
  }, []);

  const handleAddProduct = (data) => {
    createProduct(data).then((response) => {
      setProducts([...products, response.data]);
    });
  };

  const handleUpdateProduct = (id, data) => {
    updateProduct(id, data).then(() => {
      setProducts(products.map((prod) => (prod.id === id ? { ...prod, ...data } : prod)));
    });
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id).then(() => {
      setProducts(products.filter((prod) => prod.id !== id));
    });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Products</h1>
      <ProductForm categories={categories} onSubmit={handleAddProduct} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.description} - {product.price}
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