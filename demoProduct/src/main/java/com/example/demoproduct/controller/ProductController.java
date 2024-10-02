package com.example.demoproduct.controller;

import com.example.demoproduct.entity.Product;
import com.example.demoproduct.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequestMapping("/products")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<Product> createContact(@RequestBody Product product){
        return ResponseEntity.created(URI.create("/products")).body(productService.createProduct(product));
    }
    @GetMapping
    public ResponseEntity<PagedModel<EntityModel<Product>>> getAllProducts(
            @RequestParam(required = false) String keyword,
            Pageable pageable,
            PagedResourcesAssembler<Product> assembler) {

        // Récupération des produits paginés
        Page<Product> productsPage = productService.getAllProducts(keyword, pageable);

        // Transformation des données paginées en un modèle avec des métadonnées
        PagedModel<EntityModel<Product>> pagedModel = assembler.toModel(productsPage);

        // Retourne la réponse paginée avec un statut 200 OK
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable Long id){
        return ResponseEntity.ok(productService.getProduct(id));
    }
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

    @PatchMapping("/{id}")
    public void checkProduct(@PathVariable Long id){
        productService.checkProduct(id);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product){
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    // Route pour obtenir le nombre de produits avec stock bas
    @GetMapping("/low-stock")
    public long getLowStockProductCount() {
        return productService.countLowStockProducts();
    }
}
