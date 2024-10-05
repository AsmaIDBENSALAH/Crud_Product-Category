import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppCategoryContext, deleteCategory, getCategories } from '../../app/appCategory.js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewCategory from './NewCategory.js';

const Category = () => {
    const [query, setQuery] = useState("");
    const [categoryState, setCategoryState] = useContext(AppCategoryContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Gérer l'état du modal


    useEffect(() => {
        handleGetCategories(categoryState.keyword, categoryState.currentPage, categoryState.pageSize);
    }, []);

    const handleGetCategories = (keyword, page, size) => {
        getCategories(keyword, page, size)
            .then((resp) => {
                const categories = resp.data._embedded?.categoryList || [];
                const totalPages = resp.data.page.totalPages;
                setCategoryState({
                    ...categoryState,
                    categories: categories,
                    keyword: keyword,
                    currentPage: page,
                    pageSize: size,
                    totalPages: totalPages
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeleteCategory = (category) => {
        deleteCategory(category).then(resp => {
            const newCategories = categoryState.categories.filter((c) => c.id !== category.id);
            setCategoryState({ ...categoryState, categories: newCategories });
        }).catch(err => {
            console.log(err);
        });
    };

    const handleGotoPage = (page) => {
        if (page >= 0 && page < categoryState.totalPages) {
            handleGetCategories(categoryState.keyword, page, categoryState.pageSize);
        }
    };

    const handleInputChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        handleGetCategories(newQuery, 0, categoryState.pageSize); // Recherche immédiate
    };

    const handleShowModal = () => setShowModal(true); // Ouvrir le modal
    const handleCloseModal = () => setShowModal(false); // Fermer le modal


    return (
        <div className='p-1' style={{ backgroundColor: '#f8f9fa' }}>
            <div className='row m-1'>
                <div className='col-md'>
                    <div className="row" style={{marginTop:"1rem"}}>
                        <div className="col-sm-8">
                            <input
                                style={{ width: "15em" }}
                                value={query}
                                onChange={handleInputChange}
                                className='form-control'
                                placeholder="Search categories"
                            />
                        </div>
                        <div className="col-sm-4 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn btn-info add-new"
                                style={{ fontSize: "1rem", fontWeight: "40rem", width: "8rem", borderRadius: "3rem" }}
                                onClick={handleShowModal} // Ouvrir le modal
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ fontSize: "1rem", fontWeight: "18rem" }} />
                                Add New
                            </button>
                        </div>
                    </div>
                    <div className='crd'>
                        <div className="table-container" style={{marginTop:"2rem"}}>
                            <table className='table' style={{borderCollapse: "collapse", width: "100%"}}>
                                <thead>
                                    <tr>
                                        <th className='thStyle'>ID</th>
                                        <th className='thStyle'>Name</th>
                                        <th className='thStyle'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(categoryState.categories) && categoryState.categories.length > 0
                                        ? categoryState.categories.map(category => (
                                            <tr key={category.id} style={{backgroundColor: "#fff"}}>
                                                <td className='tdStyle'>{category.id}</td>
                                                <td className='tdStyle'>{category.name}</td>
                                                <td style={{padding: "10px", border: "1px solid #ddd"}}>
                                                    <button onClick={() => handleDeleteCategory(category)} style={{marginRight:"1rem"}} className="btn btn-outline-danger">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                    
                                                    <button onClick={() => navigate(`/editCategory/${category.id}`)} className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td colSpan="3" style={{padding: "10px", textAlign: "center"}}>No categories found.</td></tr>}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="fixed-bottom " style={{marginBottom:"10vh", backgroundColor: '#f8f9fa' }}>
                                <ul className='pagination'>
                                    <button
                                        onClick={() => handleGotoPage(categoryState.currentPage - 1)}
                                        className='btn btn-info ms-1'
                                        disabled={categoryState.currentPage === 0}
                                    >
                                        Previous
                                    </button>
                                    {new Array(categoryState.totalPages)
                                        .fill(0)
                                        .map((_, index) => (
                                            <li key={index}>
                                                <button
                                                    onClick={() => handleGotoPage(index)}
                                                    className={index === categoryState.currentPage
                                                        ? 'btn btn-info ms-1'
                                                        : 'btn btn-outline-info ms-1'}
                                                >
                                                    {index + 1}
                                                </button>
                                            </li>
                                        ))}
                                    <button
                                        onClick={() => handleGotoPage(categoryState.currentPage + 1)}
                                        className='btn btn-info ms-1'
                                        disabled={categoryState.currentPage === categoryState.totalPages - 1}
                                    >
                                        Next
                                    </button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

             {/* Modal pour ajouter un produit */}
             <NewCategory
                show={showModal}
                handleClose={handleCloseModal}
               
            />
        </div>
    );
};

export default Category;
