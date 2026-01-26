package com.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.*;
import com.backend.entity.*;

import jakarta.transaction.Transactional;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
	@Query(value="""
			SELECT  COUNT(o.order_id) AS totalOrders,
					SUM(o.total_amount) AS totalRevenue,
					AVG(r.rating) AS averageRating
			FROM orders o join reviews r
			ON o.order_id = r.order_id
			WHERE r.review_for = 'RESTAURANT_REVIEW' AND r.rating IS NOT NULL AND restaurant_id = :restaurant_id
	""",nativeQuery = true)
	RestaurantStaticsProjectionDTO reviews(@Param("restaurant_id") Long restaurant_id);
	
	@Query("""
	        SELECT new com.backend.dto.RestaurantMenuDishesDTO(
	            d.id,
	            d.name,
	            md.description,
	            md.price,
	            md.isAvailable
	        )
	        FROM Menu m
	        JOIN m.menuDishes md
	        JOIN md.dish d
	        WHERE m.restaurant.id = :restaurantId
	          AND m.isActive = true
	""")
	List<RestaurantMenuDishesDTO> findMenuDishesByRestaurantId(@Param("restaurantId") Long restaurantId);
	
	@Modifying
	@Transactional
	@Query("""
	    UPDATE MenuDish md
	    SET md.isAvailable = NOT md.isAvailable
	    WHERE md.dish.id = :dishId
	""")
	int changeAvailability(@Param("dishId") Long dishId);

	@Modifying
	@Transactional
	@Query("""
	    DELETE FROM MenuDish md
	    WHERE md.menu.id = :menuId
	      AND md.dish.id = :dishId
	""")
	int deleteDish(@Param("menuId") long menuId, @Param("dishId") long dishId);

	
}








