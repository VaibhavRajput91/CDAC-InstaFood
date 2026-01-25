package com.backend.repository.delivery;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.dto.delivery.DeliveryProfileDto;
import com.backend.entity.DeliveryPartner;

public interface DeliveryProfileRepository extends JpaRepository<DeliveryPartner, Long> {
	
	// to check existence of delivery partner by id
	public boolean existsById(Long id);
	
	// method to get delivery partner profile by id
	public Optional<DeliveryPartner> findById(Long id);
	
	// update the details of delivery partner
	public DeliveryPartner save(DeliveryPartner deliveryPartner);
	
	
}
