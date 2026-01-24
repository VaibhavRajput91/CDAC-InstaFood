package com.backend.repository.delivery;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.Order;

public interface DeliveryOrderRepository extends JpaRepository<Order, Long> {
	public List<Order> findByDeliveryPartnerIdAndCreatedOnBetween(Long deliveryPartnerId, LocalDateTime start, LocalDateTime end);
	
	public List<Order> findByDeliveryPartnerIdOrderByCreatedOnDesc(Long deliveryPartnerId);
}
