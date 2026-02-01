package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.dto.TotalOrdersDetailsDTO;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.Restaurant;
import com.backend.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	Optional<List<Order>> findByCustomer(User customer);
	Optional<Restaurant> findRestaurantById(Long id); // USED TO SHOW RESTAURANT DETAILS IN ORDER DTO
	Optional<DeliveryPartner> findDeliveryPartnerById(Long id); // USED TO SHOW DELIVERY PARTNER DETAILS IN ORDER DTO
	Optional<List<Order>> findByRestaurantId(Long restaurantId); // USED TO GET ALL ORDERS BY A RESTAURANT
	@Query(value="""
			SELECT new com.backend.dto.TotalOrdersDetailsDTO(
			 COUNT(o.id),
			SUM(o.totalAmount)
			)
			FROM Order o
			"""
			)
	TotalOrdersDetailsDTO getTotalOrderDetailsOfAllCustomers();
	
	@Query("""
			SELECT DISTINCT o
			FROM Order o
			LEFT JOIN FETCH o.customer c
			LEFT JOIN FETCH c.address
			LEFT JOIN FETCH o.deliveryPartner dp
			LEFT JOIN FETCH dp.user
			LEFT JOIN FETCH o.orderItems oi
			LEFT JOIN FETCH oi.dish
			WHERE o.restaurant.id = :restaurantId
			AND o.orderStatus = com.backend.entity.OrderStatus.DELIVERED
	""")
	List<Order> findCompletedOrdersByRestaurant(Long restaurantId);
	
	@Query("""
			SELECT DISTINCT o
			FROM Order o
			LEFT JOIN FETCH o.customer c
			LEFT JOIN FETCH c.address
			LEFT JOIN FETCH o.orderItems oi
			LEFT JOIN FETCH oi.dish
			WHERE o.restaurant.id = :restaurantId
			AND o.orderStatus = com.backend.entity.OrderStatus.PLACED
			ORDER BY o.id DESC
	""")
	List<Order> findNewPlacedOrders(Long restaurantId);
}
