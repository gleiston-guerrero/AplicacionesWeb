package com.mitocode.repository;

import com.mitocode.model.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepo extends IGenericRepo<Product, Integer>{

    //SQL
    //SELECT * FROM Product p INNER JOIN Category c ON p.id_category = c.id_category WHERE c.name = ?;
    @Query("FROM Product p WHERE p.category.name = :name")
    List<Product> getProductsByCategory(String name);
}
