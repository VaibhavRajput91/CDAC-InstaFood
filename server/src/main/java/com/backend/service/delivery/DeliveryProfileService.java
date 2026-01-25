package com.backend.service.delivery;

import com.backend.dto.delivery.DeliveryProfileDto;

public interface DeliveryProfileService {
	
	// method to get the delivery partner profile details
	public DeliveryProfileDto getDeliveryPartnerProfile(Long deliveryPartnerId);
	
	// method to update the delivery partner profile details
	public DeliveryProfileDto updateDeliveryPartnerProfile(Long deliveryPartnerId, DeliveryProfileDto profileDto);
}
