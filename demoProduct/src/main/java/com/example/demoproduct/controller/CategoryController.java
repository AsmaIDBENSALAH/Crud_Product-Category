package com.example.demoproduct.controller;

import com.example.demoproduct.entity.Category;
import com.example.demoproduct.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<Category>>> getAllCategories(
            @RequestParam(required = false) String keyword,
            Pageable pageable,
            PagedResourcesAssembler<Category> assembler) {

        // Récupération des produits paginés
        Page<Category> categoriesPage = categoryService.getAllCategories(keyword, pageable);

        // Transformation des données paginées en un modèle avec des métadonnées
        PagedModel<EntityModel<Category>> pagedModel = assembler.toModel(categoriesPage);

        // Retourne la réponse paginée avec un statut 200 OK
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCaegory(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.getCategory(id));
    }

    @PostMapping
    public ResponseEntity<Category> saveCategory(@RequestBody Category category){
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category){
        return ResponseEntity.ok(categoryService.updateCategory(id,category));
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryService.deleteCategory(id);
    }
}
