package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.entity.Dish;

public interface DishRepository extends JpaRepository<Dish, Long> {
	
	Optional<Dish> findById(Long id); // FIND DISH BY ID
	@Query(value="""
			SELECT 
			 COUNT(id)
			FROM Dish  
			"""
			)
	Long getTotalDishesOfAllRestaurants();

}
