package com.example.demoproduct.service;

import com.example.demoproduct.entity.Product;
import com.example.demoproduct.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
@Autowired
    private ProductRepository productRepository;

    public Page<Product> getAllProducts(String keyword, Pageable pageable) {
        if (keyword != null && !keyword.isEmpty()) {
            // Rechercher les produits contenant le mot-clé dans le nom
            return productRepository.findByNameContainingIgnoreCase(keyword, pageable);
        } else {
            // Récupérer tous les produits sans filtre
            return productRepository.findAll(pageable);
        }
    }



    public Product getProduct(long id ){
        return productRepository.findById(id).orElseThrow(() -> new RuntimeException("product non found"));
    }

    public Product createProduct(Product product ){
        return productRepository.save(product);
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product product){
        product.setId(id);
        return productRepository.save(product);
    }

    @Transactional
    public void checkProduct(Long id){
         productRepository.checkProduct(id);
    }

    public long countLowStockProducts() {
        return productRepository.countByQuantityLessThanAlertThreshold();
    }
}
