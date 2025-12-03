package org.uteq.practicamito.model;

import lombok.AllArgsConstructor;

import javax.management.ConstructorParameters;

@AllArgsConstructor
public class Category {
    Integer idcategory;
    String name;
    String description;
    float price;
}
