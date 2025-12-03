package org.uteq.service.impl;

import org.uteq.model.Product;
import org.uteq.repository.IProductRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl extends CRUDImpl<Product, Integer> implements IProductService {
    
    private final IProductRepo repo;

    @Override
    protected IGenericRepo<Product, Integer> getRepo() {
        return repo;
    }

}
