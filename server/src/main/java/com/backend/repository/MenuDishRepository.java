package com.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.Dish;
import com.backend.entity.Menu;
import com.backend.entity.MenuDish;
import com.backend.entity.MenuDishId;

import jakarta.transaction.Transactional;

public interface MenuDishRepository extends JpaRepository<MenuDish, MenuDishId> {

	
	Optional<MenuDish> findDishByMenuAndDishId(Menu menu, Long dishId);
	 @Query("""
		        SELECT md.price
		        FROM MenuDish md
		        WHERE md.menu.id = :menuId
		          AND md.dish.id = :dishId
		          AND md.isAvailable = true
		    """)
	 Optional<Double> getPriceByMenuIdAndDishId(
		        @Param("menuId") Long menuId,
		        @Param("dishId") Long dishId
		    );
	 
	 @Modifying
    @Transactional
    @Query("""
        UPDATE MenuDish md
        SET md.description = :description,
            md.price = :price
        WHERE md.menu.id = :menuId
          AND md.dish.id = :dishId
    """)
    int updateDishDetails(
            @Param("menuId") Long menuId,
            @Param("dishId") Long dishId,
            @Param("description") String description,
            @Param("price") Double price
    );
}
