import React, { useEffect, useState, useContext } from 'react'
import { getProductById,  updateProduct } from '../app/app';
import { useParams } from 'react-router-dom';
import { AppCategoryContext, getCategories } from '../app/appCategory.js'


const EditProduct = () => {
  const {id} = useParams();//récupérer les parametres envoyer de la route
   const [name, setName]=useState("");
   const [price, setPrice]=useState(0);
   const [checked, setChecked]=useState(false); 
   const [categories, setCategories]=useState([]);
   const [quantity, setQuantity]=useState(0);
   const [alertThreshold, setAlertThreshold]=useState(0);
   const [category, setCategory]=useState(null);
   const [categoryState, setCategoryState] =  useContext(AppCategoryContext);

    
   useEffect(() => {
    handleGetProductById();
    handleGetCategories(categoryState.keyword, categoryState.currentPage, categoryState.pageSize);
}, []);

   const  handleGetCategories = (keyword, page, size) => {
    getCategories(keyword, page, size)
       .then((resp) => {
            // Extraire les données de la réponse
       setCategories(resp.data._embedded.categoryList);
           
       })
       .catch((err) => {
           console.log(err);
       });
}


  const handleGetProductById = () => {
    getProductById(id).then(resp => {
      let product = resp.data;
      setName(product.name);
      setPrice(product.price);
      setChecked(product.checked);
      setQuantity(product.quantity);
      setAlertThreshold(product.alertThreshold);
    })
   }

   const handleUpdateProduct = (event) =>{
    event.preventDefault();//In HTML forms, when a submit button is clicked, the form's default behavior is to refresh the page (or navigate to the form's action URL if specified).
    let product = {
      id,
      name ,
      price ,
      checked,
      quantity,
      alertThreshold,
      category: category
    }
    updateProduct(product).then((resp)=>{
      alert(JSON.stringify(resp.data));
    }).catch((err)=>{
      console.log(err);
    })
   }
  return (
    
    <div className='row p-1'>
      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
         <h1>{id}</h1> 
            <form onSubmit={handleUpdateProduct}>
              <div className='mb-3'>
                <label className='form-label'>Name :</label>
                <input onChange={(e)=> setName(e.target.value)} value={name} className='form-control'></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Price :</label>
                <input onChange={(e)=> setPrice(e.target.value)} value={price} className='form-control'></input>
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
                <input onChange={(e)=> setQuantity(e.target.value)} value={quantity} className='form-control'></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Alert Threshold :</label>
                <input onChange={(e)=> setAlertThreshold(e.target.value)} value={alertThreshold} className='form-control'></input>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" onChange={(e)=> setChecked(e.target.value)} checked={checked} id="flexCheckChecked" />
                  <label className="form-check-label" htmlFor="flexCheckChecked">
                    Checked
                  </label>
              </div>
              <button className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProduct
