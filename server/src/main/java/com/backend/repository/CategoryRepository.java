package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import com.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	@Query(value="""
			SELECT 
			 COUNT(id)
			FROM Category 
			"""
			)
	Long getTotalCategoriesOfDishes();

}
