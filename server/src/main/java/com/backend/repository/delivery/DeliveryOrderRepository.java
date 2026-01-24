package com.backend.repository.delivery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.entity.Order;

public interface DeliveryOrderRepository extends JpaRepository<Order, Long> {
	public List<Order> findByDeliveryPartnerIdAndCreatedOn(Long deliveryPartnerId, LocalDate today);
	
	public List<Order> findByDeliveryPartnerIdOrderByCreatedOnDesc(Long deliveryPartnerId);
	
	
	public Optional<Order> findById(Long id);
}
