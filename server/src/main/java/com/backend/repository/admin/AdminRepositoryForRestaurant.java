package com.backend.repository.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.dto.admin.AdminRestaurantsRankingProjection;
import com.backend.entity.Restaurant;

public interface AdminRepositoryForRestaurant extends JpaRepository<Restaurant, Long> {
	
	
	@Query(value = """
		    SELECT
		        r.restaurant_id AS restaurantId,
		        ROW_NUMBER() OVER (
		            ORDER BY AVG(rv.rating) DESC, COUNT(rv.review_id) DESC
		        ) AS ranking,
		        r.restaurant_name AS name,
		        ROUND(AVG(rv.rating), 2) AS averageRating,
		        COUNT(rv.review_id) AS reviewCount
		    FROM restaurants r
		    LEFT JOIN reviews rv
		        ON rv.review_for = 'RESTAURANT_REVIEW'
		       AND rv.reviewer_id = r.restaurant_id
		    GROUP BY r.restaurant_id, r.restaurant_name
	""", nativeQuery = true)
	List<AdminRestaurantsRankingProjection> getRestaurantRanking();

	
	@Query("SELECT COUNT(r) FROM Restaurant r")
	int getTotalRestaurants();
	
	@Query(value = """
		    SELECT COUNT(*) 
		    FROM restaurants 
		    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
	""", nativeQuery = true)
	int getWeeklyNewRestaurants();

	
}
