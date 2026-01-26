package com.backend.repository.delivery;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.DeliveryLog;

public interface DeliveryDashboardRepository extends JpaRepository<DeliveryLog, Long> {
	
	// get delivery partner logs by delivery partner id
	
	
	// get new orders list 
	
	// get delivery partner status
	
	// toggle delivery partner availability status between (AVAILABLE, UNAVAILABLE)
	
	// accept delivery order request
}
