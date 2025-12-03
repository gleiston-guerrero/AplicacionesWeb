package org.uteq.repository;

import org.uteq.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface ICategoryRepo extends IGenericRepo<Category, Integer> {

    //Category save(Category category);
}
