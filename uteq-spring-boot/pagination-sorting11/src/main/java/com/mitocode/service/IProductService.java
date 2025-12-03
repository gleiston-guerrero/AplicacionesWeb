package com.mitocode.service;

import com.mitocode.model.Product;

import java.util.List;

public interface IProductService extends ICRUD<Product, Integer>{

    List<Product> getProductsByCategory(String name);
}
