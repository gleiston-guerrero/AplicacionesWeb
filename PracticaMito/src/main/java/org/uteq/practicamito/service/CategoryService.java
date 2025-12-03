package org.uteq.practicamito.service;

import org.uteq.practicamito.repository.CategoryRepo;

public class CategoryService {
    private CategoryRepo repo;
    public Category validateAndSave (Category category){
        repo = new CategoryRepo();

    }
}
