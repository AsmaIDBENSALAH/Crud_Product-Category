package com.example.demoproduct.service;

import com.example.demoproduct.entity.Category;
import com.example.demoproduct.entity.Product;
import com.example.demoproduct.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;


    public Page<Category> getAllCategories(String keyword, Pageable pageable) {
        if (keyword != null && !keyword.isEmpty()) {
            // Rechercher les produits contenant le mot-clé dans le nom
            return categoryRepository.findByNameContainingIgnoreCase(keyword, pageable);
        } else {
            // Récupérer tous les produits sans filtre
            return categoryRepository.findAll(pageable);
        }
    }

    public Category createCategory(Category category){
        return  categoryRepository.save(category);
    }

    public Category updateCategory(Long id , Category category){
        category.setId(id);
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }

    public Category getCategory(Long id){
        return categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("category non found"));
    }
}
