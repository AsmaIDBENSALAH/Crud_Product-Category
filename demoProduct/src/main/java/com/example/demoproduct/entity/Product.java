package com.example.demoproduct.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table
@Data
public class Product {

    @Id // Marks the field as a primary key.
    @GeneratedValue(strategy = GenerationType.IDENTITY)//Tells Hibernate to let the database generate the ID value
    private Long id;
    private String name;
    private long price;
    private boolean checked;

    // Nouveau champ pour la quantité de stock
    private int quantity;

    // Nouveau champ pour le seuil d'alerte
    private int alertThreshold;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
