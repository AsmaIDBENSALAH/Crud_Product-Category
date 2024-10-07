import React, { useEffect, useState, useContext } from 'react';
import { updateProduct } from '../app/app';
import { AppCategoryContext, getCategories } from '../app/appCategory.js';
import { Modal } from 'react-bootstrap';

const EditProduct = ({ show, handleClose, product }) => {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [checked, setChecked] = useState(product?.checked || false);
  const [categories, setCategories] = useState([]);
  const [quantity, setQuantity] = useState(product?.quantity || 0);
  const [alertThreshold, setAlertThreshold] = useState(product?.alertThreshold || 0);
  const [category, setCategory] = useState(product?.category || null);
  const [categoryState, setCategoryState] = useContext(AppCategoryContext);

  useEffect(() => {
    handleGetCategories(categoryState.keyword, categoryState.currentPage, categoryState.pageSize);
  }, [categoryState]);

  const handleGetCategories = (keyword, page, size) => {
    getCategories(keyword, page, size)
      .then((resp) => {
        setCategories(resp.data._embedded.categoryList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const updatedProduct = {
      id: product.id, // Garder l'ID original
      name,
      price,
      checked,
      quantity,
      alertThreshold,
      category,
    };
    updateProduct(updatedProduct)
      .then((resp) => {
        handleClose(); // Ferme la modal après la soumission

      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleUpdateProduct}>
          <div className='mb-3'>
            <label className='form-label'>Name :</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Price :</label>
            <input
              type="number"
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              value={price}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Category :</label>
            <select
              onChange={(e) => {
                const categoryId = parseInt(e.target.value);
                const selectedCategory = categories.find((cat) => cat.id === categoryId);
                setCategory(selectedCategory); // Mise à jour de la catégorie sélectionnée
              }}
              value={category?.id || ""}
              className='form-control'
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Quantity :</label>
            <input
              type="number"
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              value={quantity}
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Alert Threshold :</label>
            <input
              type="number"
              onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
              value={alertThreshold}
              className='form-control'
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={(e) => setChecked(e.target.checked)}
              checked={checked}
              id="flexCheckChecked"
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Checked
            </label>
          </div>
          <button
            type="submit"
            className='btn btn-gray'
          >
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProduct;
