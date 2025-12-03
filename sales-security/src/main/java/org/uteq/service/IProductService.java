package org.uteq.service;

import org.uteq.model.Product;

import java.util.List;

public interface IProductService extends ICRUD<Product, Integer>{

    List<Product> getProductsByCategory(String name);
}
