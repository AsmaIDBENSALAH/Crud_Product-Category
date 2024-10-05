import React, { useState, useContext, useEffect } from 'react';
import { saveCategory, AppCategoryContext } from '../../app/appCategory.js';
import { Modal } from 'react-bootstrap';

const NewCategory = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [categoryState, setCategoryState] = useContext(AppCategoryContext);

  useEffect(() => {
    if (show) {
      // Réinitialiser les champs du formulaire lorsque le modal s'ouvre
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setName("");
  };

  const handleSaveCategory = (event) => {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
    if (!name) {
      alert("Please provide a valid name.");
      return;
    }
    let category = { name };

    saveCategory(category)
      .then((resp) => {
        setCategoryState(prevState => ({
          ...prevState,
          categories: [...prevState.categories, resp.data] // Ajouter la nouvelle catégorie à la liste
        }));

        handleClose(); // Fermer le modal après soumission
        console.log(JSON.stringify(resp.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSaveCategory}>
          <div className='mb-3'>
            <label className='form-label'>Name :</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className='form-control'
              placeholder="Enter category name"
            />
          </div>
          <button className='btn btn-success'>Save</button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default NewCategory;
