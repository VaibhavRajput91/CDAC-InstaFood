package com.backend.repository.delivery;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;

public interface DeliveryPartnerApplyRepository extends JpaRepository<DeliveryPartner, Long> {
	
	// check if delivery partner exists by user id
	boolean existsByUserId(Long userId);
	
	// to return the delivery partner kyc_status by user id
	AvailabilityStatus findStatusByUserId(Long userId);
}
