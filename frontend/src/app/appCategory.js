//ce fichier pour séparer la couche applicative de la couche présentative
import axios from "axios";
import { createContext, useState } from "react";

export  const AppCategoryContext = createContext();

export const  categoriesApi = axios.create({
    baseURL: "http://localhost:8080"
});
 
export const  getCategories= (keyword="", page, size) => {
    return  categoriesApi.get(`/Category?keyword=${keyword}&page=${page}&size=${size}`);
}


export const deleteCategory = (category) => {
    return categoriesApi.delete(`/Category/${category.id}`);
}

export const getCategoryById = (id) => {
    return categoriesApi.get(`/Category/${id}`);
}

export const saveCategory = (category) => {
    return categoriesApi.post(`/Category`, category);
}


export const updateCategory = (category) => {
    return categoriesApi.put(`/Category/${category.id}`,category);
}

export const useAppCategoryState = () => {
    const initialState = {
        categories: [],
        currentPage: 0,
        pageSize: 4,
        keyword: "",
        totalPages: 0
    };

    const appState = useState(initialState);

    return appState;
}