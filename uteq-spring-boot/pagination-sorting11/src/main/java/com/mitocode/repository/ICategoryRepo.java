package com.mitocode.repository;

import com.mitocode.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

//@Repository
public interface ICategoryRepo extends IGenericRepo<Category, Integer> {

    //DerivedQuery
    //SELECT * FROM Category c WHERE c.name = ?
    List<Category> findByName(String name);

    //SELECT * FROM Category c WHERE c.name LIKE '%abc%';
    List<Category> findByNameLikeIgnoreCase(String name);
    //%XYZ% -> findByNameContains
    //%XYZ -> findByNameStartsWith
    //XYZ% -> findByNameEndsWith
    List<Category> findByNameAndEnabled(String name, boolean enabled);
    List<Category> findByNameOrEnabled(String name, boolean enabled);
    List<Category> findByEnabled(boolean enabled);
    List<Category> findByEnabledTrue();
    List<Category> findByEnabledFalse();
    Optional<Category> findOneByName(String name);
    List<Category> findTop3ByName(String name);
    List<Category> findByNameIs(String name);
    List<Category> findByNameIsNot(String name);
    List<Category> findByNameIsNull();
    List<Category> findByNameIsNotNull();
    List<Category> findByNameEqualsIgnoreCase(String name);
    List<Category> findByIdCategoryLessThan(Integer idCategory);
    List<Category> findByIdCategoryLessThanEqual(Integer idCategory);
    List<Category> findByIdCategoryGreaterThan(Integer idCategory);
    List<Category> findByIdCategoryGreaterThanEqual(Integer idCategory);
    List<Category> findByIdCategoryBetween(Integer id1, Integer id2);
    List<Category> findByNameOrderByDescription(String name);
    List<Category> findByNameOrderByDescriptionDesc(String name);
    List<Category> findByNameOrderByDescriptionAsc(String name);

    //JPQL: Java Persistence Query Language
    @Query("FROM Category c WHERE c.name = :name AND c.description LIKE %:desc%")
    List<Category> getNameAndDescription1(@Param("name") String name, @Param("desc") String desc);

    @Query("SELECT new com.mitocode.model.Category(c.name, c.enabled) FROM Category c WHERE c.name = :name AND c.description LIKE %:desc%")
    List<Category> getNameAndDescription2(@Param("name") String name, @Param("desc") String desc);

    //SQL: NativeQuery
    @Query(value = "SELECT * FROM category c WHERE c.name = :name", nativeQuery = true)
    List<Category> getNameSQL(@Param("name") String name);

    @Modifying
    @Query(value = "UPDATE category SET name = :name", nativeQuery = true)
    Integer updateNames(@Param("name") String name);
}
