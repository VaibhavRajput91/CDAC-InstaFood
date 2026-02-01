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
	
	@Query("""
		    SELECT r.id
		    FROM Restaurant r
		    WHERE r.user.id = :userId
		""")
	Long findRestaurantIdByUserId(@Param("userId") Long userId);
	
	@Modifying
    @Transactional
    @Query("""
        UPDATE Restaurant r
        SET r.status = CASE
            WHEN r.status = com.backend.entity.AvailabilityStatus.AVAILABLE
                THEN com.backend.entity.AvailabilityStatus.UNAVAILABLE
            WHEN r.status = com.backend.entity.AvailabilityStatus.UNAVAILABLE
                THEN com.backend.entity.AvailabilityStatus.AVAILABLE
            ELSE r.status
        END
        WHERE r.id = :restaurantId
    """)
    int changeRestaurantAvailability(@Param("restaurantId") Long restaurantId);
	

	@Query(value="""
			SELECT
				COUNT(DISTINCT o.order_id) AS totalOrders,
				SUM(o.total_amount)        AS totalRevenue,
				AVG(r.rating)              AS averageRating
			FROM orders o
				LEFT OUTER JOIN reviews r
				ON o.order_id = r.order_id
				AND r.review_for = 'RESTAURANT_REVIEW'
			WHERE o.restaurant_id = :restaurant_id;
	""",nativeQuery = true)
	RestaurantStatisticsProjectionDTO reviews(@Param("restaurant_id") Long restaurant_id);
	
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
	          AND md.isAvailable = true
	""")
	List<RestaurantMenuDishesDTO> findAvailableMenuDishesByRestaurantId(@Param("restaurantId") Long restaurantId);
	
	@Modifying
	@Transactional
	@Query("""
	    UPDATE MenuDish md
	    SET md.isAvailable = NOT md.isAvailable
	    WHERE md.dish.id = :dishId AND md.menu.id= :menuId
	""")
	int changeAvailability(@Param("menuId") long menuId,@Param("dishId") long dishId);

	@Modifying
	@Transactional
	@Query("""
	    DELETE FROM MenuDish md
	    WHERE md.menu.id = :menuId
	      AND md.dish.id = :dishId
	""")
	int deleteDish(@Param("menuId") long menuId, @Param("dishId") long dishId);
	
	
	List<Restaurant> findAll();
	
	List<Restaurant> findByUserAddressPostalCode(String postalCode);
	
	
	
}








