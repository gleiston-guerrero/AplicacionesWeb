package com.mitocode.service;

import com.mitocode.model.Category;
import com.mitocode.repository.ICategoryRepo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {

    //@Autowired
    private final ICategoryRepo repo;
    private String message;

    /*public CategoryServiceImpl(ICategoryRepo repo) {
        this.repo = repo;
    }*/

    @Override
    public Category validAndSave(Category category) {
        //repo = new CategoryRepo();

        if(category.getIdCategory() != 0){
            return repo.save(category);
        }else{
            return new Category(0, "DEFAULT", "DEFAULT", false);
        }
    }
}
