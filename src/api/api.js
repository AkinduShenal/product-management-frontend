import axios from 'axios';

// Set the base URL for the API
const API = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your backend URL
});

// Example: Get all products
export const fetchProducts = () => API.get('/products');

// Example: Get all categories
export const fetchCategories = () => API.get('/categories');

// Example: Add a new product
export const createProduct = (productData) => API.post('/products', productData);

// Example: Add a new category
export const createCategory = (categoryData) => API.post('/categories', categoryData);

// Example: Delete a product
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Example: Delete a category
export const deleteCategory = (id) => API.delete(`/categories/${id}`);

// Example: Update a product
export const updateProduct = (id, updatedData) => API.put(`/products/${id}`, updatedData);

// Example: Update a category
export const updateCategory = (id, updatedData) => API.put(`/categories/${id}`, updatedData);

export default API;
