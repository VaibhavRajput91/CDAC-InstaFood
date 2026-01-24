package com.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.dto.RestaurantStaticsProjectionDTO;
import com.backend.entity.*;

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
}
