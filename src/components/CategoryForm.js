import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory } from '../api/api';

const CategoryForm = ({ onSuccess, editingCategory, onCancelEdit }) => {
  const [formData, setFormData] = useState({ name: '' });

  useEffect(() => {
    if (editingCategory) setFormData(editingCategory);
  }, [editingCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editingCategory
      ? updateCategory(editingCategory.id, formData)
      : createCategory(formData);

    action
      .then(() => {
        onSuccess();
        setFormData({ name: '' });
        if (onCancelEdit) onCancelEdit();
      })
      .catch((error) => console.error('Error saving category:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Category Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <button type="submit">{editingCategory ? 'Update' : 'Add'} Category</button>
      {editingCategory && <button onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default CategoryForm;
