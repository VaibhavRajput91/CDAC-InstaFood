package com.backend.repository.delivery;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Order;

public interface DeliveryOrderRepository extends JpaRepository<Order, Long> {
	public List<Order> findByDeliveryPartnerId(long deliveryPartnerId);
}
