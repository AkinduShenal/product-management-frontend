import React, { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../services/api';

const ProductForm = ({ onSuccess, editingProduct, onCancelEdit }) => {
  const [formData, setFormData] = useState({ name: '', price: '' });

  useEffect(() => {
    if (editingProduct) setFormData(editingProduct);
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = editingProduct
      ? updateProduct(editingProduct.id, formData)
      : createProduct(formData);

    action
      .then(() => {
        onSuccess();
        setFormData({ name: '', price: '' });
        if (onCancelEdit) onCancelEdit();
      })
      .catch((error) => console.error('Error saving product:', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />
      <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
      {editingProduct && <button onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default ProductForm;
