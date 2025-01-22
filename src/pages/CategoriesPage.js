import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../api/api';
import Loader from '../components/Loader';
import CategoryForm from '../components/CategoryForm';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);

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
    <div className="container mt-4">
      <h1 className="text-center mb-4">Categories</h1>

      {/* Data Entry Section */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Add New Category</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleAddCategory({
                name: formData.get('name'),
                description: formData.get('description'),
              });
              e.target.reset(); // Clear the form
            }}
          >
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">
                Category Name
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                className="form-control"
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Enter description"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <ul className="list-group">
        {categories.map((category) => (
          <li
            key={category.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {editingCategory?.id === category.id ? (
              // Inline editing form
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateCategory(category.id, editingCategory);
                }}
                className="w-100"
              >
                <div className="mb-2">
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    placeholder="Category Name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    value={editingCategory.description}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, description: e.target.value })
                    }
                    placeholder="Description"
                    className="form-control"
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="submit" className="btn btn-success btn-sm me-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditingCategory(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              // Normal display mode
              <>
                <div>
                  <strong>{category.name}</strong> - {category.description}
                </div>
                <div>
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
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

export default CategoriesPage;
