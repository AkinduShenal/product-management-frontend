import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../api/api';
import Loader from '../components/Loader';
import CategoryForm from '../components/CategoryForm';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null); // Track the category being edited

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

  const handleUpdateCategory = (id, updatedData) => {
    updateCategory(id, updatedData).then(() => {
      setCategories(categories.map((cat) => (cat.id === id ? { ...cat, ...updatedData } : cat)));
      setEditingCategory(null); // Exit editing mode
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
            {editingCategory?.id === category.id ? (
              // Inline editing form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateCategory(category.id, editingCategory);
                }}
              >
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  placeholder="Category Name"
                  required
                />
                <textarea
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  placeholder="Description"
                />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingCategory(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // Normal display mode
              <>
                {category.name} - {category.description}
                <button onClick={() => setEditingCategory(category)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
