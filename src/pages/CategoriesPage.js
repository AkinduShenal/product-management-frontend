import React, { useState, useEffect } from 'react';
import { fetchCategories, deleteCategory } from '../api/api';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Fetch categories when the component loads
  useEffect(() => {
    loadCategories();
  }, []);

  // Load categories from the API
  const loadCategories = () => {
    fetchCategories()
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error fetching categories:', error));
  };

  // Handle category deletion
  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => loadCategories())
      .catch((error) => console.error('Error deleting category:', error));
  };

  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm
        onSuccess={loadCategories}
        editingCategory={editingCategory}
        onCancelEdit={() => setEditingCategory(null)}
      />
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => setEditingCategory(category)}>Edit</button>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
