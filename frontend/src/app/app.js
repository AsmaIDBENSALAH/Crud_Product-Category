//ce fichier pour séparer la couche applicative de la couche présentative
import axios from "axios";
import { createContext, useState } from "react";

export  const AppContext = createContext();

export const  productsApi = axios.create({
    baseURL: "http://localhost:8080"
});
 
export const  getProducts= (keyword="", page, size) => {
    return  productsApi.get(`/products?keyword=${keyword}&page=${page}&size=${size}`);
}


export const deleteProduct = (product) => {
    return productsApi.delete(`/products/${product.id}`);
}

export const getProductById = (id) => {
    return productsApi.get(`/products/${id}`);
}

export const saveProduct = (product) => {
    return productsApi.post(`/products`, product);
}

export const checkProduct = (product) => {
    return productsApi.patch(`/products/${product.id}`);
}

export const updateProduct = (product) => {
    return productsApi.put(`/products/${product.id}`,product);
}

export const fetchLowStockCount = () => {
    return productsApi.get(`/products/low-stock`);
}

export const useAppState = () => {
    const initialState = {
        products: [],
        currentPage: 0,
        pageSize: 5,
        keyword: "",
        totalPages: 0
    };

    const appState = useState(initialState);

    return appState;
}