import React, { useState, useContext, useEffect } from 'react'
import { saveProduct, AppContext } from '../app/app';
import { AppCategoryContext, getCategories } from '../app/appCategory.js'
import { Modal } from 'react-bootstrap';



const NewProduct = ({ show, handleClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [alertThreshold, setAlertThreshold] = useState(0);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryState, setCategoryState] = useContext(AppCategoryContext);
  const [productState, setProductState] = useContext(AppContext);


  useEffect(() => {
    handleGetCategories(categoryState.keyword, categoryState.currentPage, categoryState.pageSize);
  }, [productState]);

  useEffect(() => {
    if (show) {
      // Réinitialiser les champs du formulaire lorsque le modal s'ouvre
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setName("");
    setPrice(0);
    setChecked(false);
    setQuantity(0);
    setAlertThreshold(0);
    setCategory(null);
  };

  const handleGetCategories = (keyword, page, size) => {
    getCategories(keyword, page, size)
      .then((resp) => {
        // Extraire les données de la réponse
        setCategories(resp.data._embedded.categoryList);

      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleSaveProduct = (event) => {
    event.preventDefault();//In HTML forms, when a submit button is clicked, the form's default behavior is to refresh the page (or navigate to the form's action URL if specified).
    if (!name || price <= 0) {
      alert("Please provide valid values for name and price.");
      return;
    }
    let product = {
      name,
      price,
      checked,
      category: category,
      quantity,
      alertThreshold
    }

    saveProduct(product).then((resp) => {
      setProductState(prevState => ({
        ...prevState,
        products: [...prevState.products, resp.data] // Ajouter le nouveau produit à la liste
      }));
      
      handleClose(); // Fermer le modal après soumission
      console.log(JSON.stringify(resp.data));
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSaveProduct}>
          <div className='mb-3'>
            <label className='form-label'>Name :</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className='form-control'></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Price :</label>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='form-control'></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Category :</label>
            <select
              onChange={(e) => {
                const categoryId = parseInt(e.target.value);
                const category = categories.find(cat => cat.id === categoryId);
                setCategory(category); // On met à jour la catégorie sélectionnée
              }}
              value={category?.id || ""}
              className='form-control'>
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

          </div>
          <div className='mb-3'>
            <label className='form-label'>Quantity :</label>
            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} className='form-control'></input>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Alert Threshold :</label>
            <input onChange={(e) => setAlertThreshold(e.target.value)} value={alertThreshold} className='form-control'></input>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onChange={(e) => setChecked(e.target.checked)} checked={checked} id="flexCheckChecked" />
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

  )
}

export default NewProduct
