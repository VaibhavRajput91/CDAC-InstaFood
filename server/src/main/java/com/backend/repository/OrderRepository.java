package com.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.DeliveryPartner;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.Restaurant;
import com.backend.entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	Optional<Order> findByCustomer(User customer);
	Optional<Restaurant> findRestaurantById(Long id); // USED TO SHOW RESTAURANT DETAILS IN ORDER DTO
	Optional<DeliveryPartner> findDeliveryPartnerById(Long id); // USED TO SHOW DELIVERY PARTNER DETAILS IN ORDER DTO
	Optional<List<Order>> findByRestaurantId(Long restaurantId); // USED TO GET ALL ORDERS BY A RESTAURANT

}
