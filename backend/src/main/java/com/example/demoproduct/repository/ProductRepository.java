package com.example.demoproduct.repository;

import com.example.demoproduct.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Modifying
    @Query("UPDATE Product p SET p.checked = CASE WHEN p.checked = true THEN false ELSE true END WHERE p.id = :id")
    public void checkProduct(@Param("id") Long id);

    @Query("SELECT COUNT(*) FROM Product p WHERE p.quantity < p.alertThreshold")
    public long countByQuantityLessThanAlertThreshold();


    Page<Product> findByNameContainingIgnoreCase(String keyword, Pageable pageable);

}
