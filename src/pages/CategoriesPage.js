import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../api/api';
import Loader from '../components/Loader';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories().then((response) => {
      setCategories(response.data);
      setLoading(false);
    });
  }, []);

  const handleAddCategory = (data) => {
    createCategory(data).then((response) => {
      setCategories([...categories, response.data]);
    });
  };

  const handleUpdateCategory = (id, data) => {
    updateCategory(id, data).then(() => {
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...data } : cat)));
    });
  };

  const handleDeleteCategory = (id) => {
    deleteCategory(id).then(() => {
      setCategories(categories.filter((cat) => cat.id !== id));
    });
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm onSubmit={handleAddCategory} />
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name} - {category.description}
            <button onClick={() => handleUpdateCategory(category.id, { name: 'Updated Name' })}>
              Edit
            </button>
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;