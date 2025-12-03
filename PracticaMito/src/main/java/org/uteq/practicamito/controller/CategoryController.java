package org.uteq.practicamito.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.uteq.practicamito.model.Category;
import org.uteq.practicamito.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    CategoryService categoryService;
    @GetMapping
    /*public Category sayHello(){
        return new Category(1,"Computer","Computador i9", (float)325.36);
    }*/
    public Category save() {
        categoryService = new CategoryService();
    }
}


}
