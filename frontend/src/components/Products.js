import { faCheckCircle, faCircle, faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppContext, checkProduct, deleteProduct, getProducts } from '../app/app.js';
import React, { useContext, useEffect, useState } from 'react';
import NewProduct from './NewProduct.js'; // Importer le nouveau composant
import EditProduct from './EditProduct.js';


const Products = () => {
    const [query, setQuery] = useState("");
    const [productState, setProductState] = useContext(AppContext);
    const [showNewProductModal, setShowNewProductModal] = useState(false); // Modal pour la création
    const [showEditProductModal, setShowEditProductModal] = useState(false); // Modal pour l'édition
    const [selectedProduct, setSelectedProduct] = useState(); // État pour le produit sélectionné

    useEffect(() => {
        handleGetProducts(productState.keyword, productState.currentPage, productState.pageSize);
    }, []);



    const handleGetProducts = (keyword, page, size) => {
        getProducts(keyword, page, size)
            .then((resp) => {
                const products = resp.data._embedded?.productList || [];
                const totalPages = resp.data.page.totalPages;
                setProductState({
                    ...productState,
                    products: products,
                    keyword: keyword,
                    currentPage: page,
                    pageSize: size,
                    totalPages: totalPages
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteProduct = (product) => {
        deleteProduct(product).then(resp => {
            const newProducts = productState.products.filter((p) => p.id !== product.id);
            setProductState({ ...productState, products: newProducts });
            handleGetProducts(productState.keyword, productState.currentPage, productState.pageSize);

        }).catch(err => {
            console.log(err);
        });
    };

    const handleCheckProduct = (product) => {
        checkProduct(product).then(resp => {
            const newProducts = productState.products.map(p => {
                if (p.id === product.id) {
                    p.checked = !p.checked;
                }
                return p;
            });
            setProductState({ ...productState, products: newProducts });
        }).catch(err => {
            console.log(err);
        });
    }

    const handleGotoPage = (page) => {
        if (page >= 0 && page < productState.totalPages) {
            handleGetProducts(productState.keyword, page, productState.pageSize);
        }
    }

    const handleInputChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        handleGetProducts(newQuery, 0, productState.pageSize); // Trigger search
    }

    // Gestion des modals
    const handleShowNewProductModal = () => setShowNewProductModal(true); // Ouvrir le modal de création
    const handleCloseNewProductModal = () => setShowNewProductModal(false); // Ouvrir le modal de création

    const handleShowEditProductModal = (product) => {

        setSelectedProduct(product);  // Met à jour le produit sélectionné
        setShowEditProductModal(true); // Ouvre le modal après avoir mis à jour le produit
    };


    const handleCloseEditProductModal = () => {
        setShowEditProductModal(false); // Fermer le modal d'édition
        setSelectedProduct(null); // Réinitialiser le produit sélectionné
        handleGetProducts(productState.keyword, productState.currentPage, productState.pageSize);

    };

    return (
        <div className='p-1' style={{ backgroundColor: '#f8f9fa' }}>
            <div className='row m-1'>
                <div className='col-md'>
                    <div className="row" style={{ marginTop: "1rem" }}>
                        <div className="col-sm-8">
                            <input
                                style={{ width: "15em" }}
                                value={query}
                                onChange={handleInputChange} // Trigger search on change
                                className='form-control'
                                placeholder="Search products"
                            />
                        </div>
                        <div className="col-sm-4 d-flex justify-content-end">
                            <button
                                type="button"
                                className="btn add-new"
                                style={{
                                    backgroundColor: "#e0e0e0", // Gris clair pour le bouton
                                    color: "#333", // Gris foncé pour le texte
                                    fontSize: "1rem",
                                    fontWeight: "40rem",
                                    width: "8rem",
                                    borderRadius: "3rem"
                                }}
                                onClick={handleShowNewProductModal} // Ouvrir le modal de création
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ fontSize: "1rem", fontWeight: "18rem", color: "#333" }} // Gris foncé pour l'icône également
                                />
                                Add New
                            </button>

                        </div>
                    </div>
                    <div className='crd'>
                        <div className="table-container" style={{ marginTop: "2rem" }}>
                            <table className='table' style={{ borderCollapse: "collapse", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className='thStyle'>ID</th>
                                        <th className='thStyle'>Name</th>
                                        <th className='thStyle'>Price</th>
                                        <th className='thStyle'>Category</th>
                                        <th className='thStyle'>Quantity</th>
                                        <th className='thStyle'>Alert Threshold</th>
                                        <th className='thStyle'>Checked</th>
                                        <th className='thStyle'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(productState.products) && productState.products.length > 0
                                        ? productState.products.map(product => (
                                            <tr key={product.id} style={{ backgroundColor: product.checked ? "#e9f7ef" : "#fff" }}>
                                                <td className='tdStyle' >{product.id}</td>
                                                <td className='tdStyle'>{product.name}</td>
                                                <td className='tdStyle'>{product.price}</td>
                                                <td className='tdStyle'>{product.category ? product.category.name : "No Category"}</td>
                                                <td className='tdStyle'>{product.quantity}</td>
                                                <td className='tdStyle'>{product.alertThreshold}</td>
                                                <td className='tdStyle'>
                                                    <button onClick={() => handleCheckProduct(product)} className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle} />
                                                    </button>
                                                </td>
                                                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                                    <button onClick={() => handleDeleteProduct(product)} style={{ marginRight: "1rem" }} className="btn btn-outline-danger">
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>

                                                    <button onClick={() => handleShowEditProductModal(product)} className="btn btn-outline-success">
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td colSpan="8" style={{ padding: "10px", textAlign: "center" }}>No products found.</td></tr>}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="fixed-bottom " style={{ marginBottom: "10vh", backgroundColor: '#f8f9fa' }}>
                                <ul className='pagination'>
                                    <button
                                        onClick={() => handleGotoPage(productState.currentPage - 1)}
                                        className='btn btn-info ms-1'
                                        disabled={productState.currentPage === 0} // Disable if on the first page
                                    >
                                        Previous
                                    </button>
                                    {
                                        new Array(productState.totalPages)
                                            .fill(0)
                                            .map((_, index) => (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => handleGotoPage(index)}
                                                        className={index === productState.currentPage
                                                            ? 'btn btn-info ms-1'
                                                            : 'btn btn-outline-info ms-1'}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))
                                    }
                                    <button
                                        onClick={() => handleGotoPage(productState.currentPage + 1)}
                                        className='btn btn-info ms-1'
                                        disabled={productState.currentPage === productState.totalPages - 1} // Disable if on the last page
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
            <NewProduct
                show={showNewProductModal}
                handleClose={handleCloseNewProductModal}
                handleGetProducts={handleGetProducts} // Pass the getProducts function
            />

            {/* Modal pour éditer un produit */}
            <div>
                {/* Modal pour éditer un produit */}
                {showEditProductModal && selectedProduct && (
                    <EditProduct
                        show={showEditProductModal}
                        handleClose={handleCloseEditProductModal}
                        product={selectedProduct} // Pass the selected product for editing
                    />
                )}
            </div>
        </div>
    );
};

export default Products;
