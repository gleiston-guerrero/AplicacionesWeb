package com.mitocode.service.impl;

import com.mitocode.model.Product;
import com.mitocode.repository.IProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductNoAsyncServiceImpl {

    private final IProductRepo repo;

    public List<Product> getProducts1() throws InterruptedException {
        Thread.sleep(1000);
        return repo.findAll();
    }

    public List<Product> getProducts2() throws InterruptedException {
        Thread.sleep(3000);
        return repo.findAll();
    }

    public List<Product> getProducts3() throws InterruptedException {
        Thread.sleep(2000);
        return repo.findAll();
    }
}
