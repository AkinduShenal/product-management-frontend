import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '../api/api';
import Loader from '../components/Loader';
import ProductForm from '../components/ProductForm';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  // Fetch products and categories on component mount
  useEffect(() => {
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productResponse, categoryResponse]) => {
        console.log('Fetched Products:', productResponse.data);
        console.log('Fetched Categories:', categoryResponse.data);
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleAddProduct = (data) => {
    createProduct(data)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleUpdateProduct = (id, updatedData) => {
    updateProduct(id, updatedData)
      .then((response) => {
        console.log('Update response:', response.data);
        setProducts(products.map((prod) => (prod.id === id ? { ...prod, ...updatedData } : prod)));
        setEditingProduct(null); // Exit editing mode
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        setProducts(products.filter((prod) => prod.id !== id));
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Products</h1>
      <ProductForm categories={categories} onSubmit={handleAddProduct} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct?.id === product.id ? (
              // Inline editing form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateProduct(product.id, editingProduct);
                }}
              >
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  placeholder="Product Name"
                  required
                />
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                  placeholder="Price"
                  step="0.01"
                  required
                />
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  placeholder="Description"
                />
                <select
                  value={editingProduct.category_id}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category_id: parseInt(e.target.value, 10) })}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // Normal display mode
              <>
                {product.name || 'Unnamed Product'} - {product.description || 'No description available'} - 
                ${typeof product.price === 'number' || !isNaN(product.price) ? parseFloat(product.price).toFixed(2) : 'N/A'}
                <button onClick={() => setEditingProduct(product)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
