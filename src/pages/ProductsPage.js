import React, { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct, fetchCategories } from '../api/api';
import Loader from '../components/Loader';
import ProductForm from '../components/ProductForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited

  // Fetch products and categories on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  // Function to fetch all data (products and categories)
  const fetchAllData = () => {
    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([productResponse, categoryResponse]) => {
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleAddProduct = (data) => {
    createProduct(data)
      .then(() => {
        fetchAllData(); // Auto-refresh the data after adding a product
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  const handleUpdateProduct = (id, updatedData) => {
    updateProduct(id, updatedData)
      .then(() => {
        fetchAllData(); // Auto-refresh the data after updating a product
        setEditingProduct(null); // Exit editing mode
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        fetchAllData(); // Auto-refresh the data after deleting a product
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Products</h1>

      {/* Add Product Form */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Product</h5>
          <ProductForm categories={categories} onSubmit={handleAddProduct} />
        </div>
      </div>

      {/* Product List */}
      <ul className="list-group">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingProduct?.id === product.id ? (
              // Inline Editing Form
              editingProduct && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateProduct(product.id, editingProduct);
                  }}
                  className="w-100"
                >
                  <div className="mb-2">
                    <label className="form-label" htmlFor={`productName-${product.id}`}>
                      Product Name
                    </label>
                    <input
                      id={`productName-${product.id}`}
                      type="text"
                      value={editingProduct.name || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      placeholder="Product Name"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor={`productPrice-${product.id}`}>
                      Price
                    </label>
                    <input
                      id={`productPrice-${product.id}`}
                      type="number"
                      value={editingProduct.price || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                      }
                      placeholder="Price"
                      step="0.01"
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor={`productDescription-${product.id}`}>
                      Description
                    </label>
                    <textarea
                      id={`productDescription-${product.id}`}
                      value={editingProduct.description || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, description: e.target.value })
                      }
                      placeholder="Description"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="form-label" htmlFor={`productCategory-${product.id}`}>
                      Category
                    </label>
                    <select
                      id={`productCategory-${product.id}`}
                      value={editingProduct.category_id || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category_id: parseInt(e.target.value, 10),
                        })
                      }
                      className="form-select"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success btn-sm me-2">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => setEditingProduct(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )
            ) : (
              // Normal Display Mode
              <>
                <div>
                  <strong>{product.name}</strong> - {product.description} - $
                  {typeof product.price === 'number' || !isNaN(product.price)
                    ? parseFloat(product.price).toFixed(2)
                    : 'N/A'}
                </div>
                <div>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
