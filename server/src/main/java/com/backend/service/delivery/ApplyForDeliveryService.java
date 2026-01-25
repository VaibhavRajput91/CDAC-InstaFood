package com.backend.service.delivery;

import com.backend.dto.delivery.DeliveryPartnerApplyDto;

public interface ApplyForDeliveryService {
	// check if delivery partner already exists
	boolean deliveryPartnerExists(Long userId);
	
	// apply for delivery partner
	void applyForDeliveryPartner(Long userId, DeliveryPartnerApplyDto applyDto);
	
	// if exists and status is rejected, allow re-aplication
	boolean canReapply(Long userId);
	
	// re-apply for delivery partner
	void reapplyForDeliveryPartner(Long userId, DeliveryPartnerApplyDto applyDto);
}
