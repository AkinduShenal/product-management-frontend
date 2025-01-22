import React, { useState } from 'react';

const ProductForm = ({ categories, onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [quantity, setQuantity] = useState(initialData.quantity || '');
  const [categoryId, setCategoryId] = useState(initialData.category_id || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price, quantity, category_id: categoryId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        
      >
        <option value="" disabled>Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
