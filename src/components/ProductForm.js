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
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm">
      <div className="mb-3">
        <label htmlFor="productName" className="form-label">Product Name</label>
        <input
          id="productName"
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productDescription" className="form-label">Description</label>
        <textarea
          id="productDescription"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productPrice" className="form-label">Price</label>
        <input
          id="productPrice"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productQuantity" className="form-label">Quantity</label>
        <input
          id="productQuantity"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="productCategory" className="form-label">Category</label>
        <select
          id="productCategory"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="form-select"
        >
          <option value="" disabled>Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-100">Submit</button>
    </form>
  );
};

export default ProductForm;
