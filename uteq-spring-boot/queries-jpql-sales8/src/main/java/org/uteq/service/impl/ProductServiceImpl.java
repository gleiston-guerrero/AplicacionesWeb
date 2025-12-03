package org.uteq.service.impl;

import org.uteq.model.Product;
import org.uteq.repository.IProductRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl extends CRUDImpl<Product, Integer> implements IProductService {
    
    private final IProductRepo repo;

    @Override
    protected IGenericRepo<Product, Integer> getRepo() {
        return repo;
    }

    @Override
    public List<Product> getProductsByCategory(String name) {
        return repo.getProductsByCategory(name);
    }
}
