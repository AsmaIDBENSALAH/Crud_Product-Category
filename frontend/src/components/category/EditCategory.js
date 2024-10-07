import React,{useState} from 'react'
import { updateCategory } from '../../app/appCategory';
import { Modal } from 'react-bootstrap';


const EditCategory = ({ show, handleClose, category }) => {
    const [name, setName] = useState(category?.name || "");

    const handleUpdateProduct = (event) => {
        event.preventDefault(); // Empêche le rechargement de la page
        const updatedCategory = {
          id: category.id, // Garder l'ID original
          name,
          
        };
        updateCategory(updatedCategory)
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

export default EditCategory
