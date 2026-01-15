package com.mitocode.controller;

import com.mitocode.model.Category;
import com.mitocode.service.CategoryServiceImpl;
import com.mitocode.service.ICategoryService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {

    //@Autowired
    private final ICategoryService service;

    /*public CategoryController(ICategoryService service) {
        this.service = service;
    }*/

    @GetMapping
    public Category save() {
        //service = new CategoryService();
        return service.validAndSave(new Category(0, "COMPUTERS", "Some Computers", true));
    }



}
