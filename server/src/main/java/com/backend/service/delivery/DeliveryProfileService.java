package com.backend.service.delivery;

import com.backend.dto.delivery.DeliveryProfileDto;
import com.backend.dto.delivery.DeliveryResponseDto;

public interface DeliveryProfileService {
	
	// method to get the delivery partner profile details
	public DeliveryProfileDto getDeliveryPartnerProfile(Long deliveryPartnerId);
	
	// method to update the delivery partner profile details
	public DeliveryProfileDto updateDeliveryPartnerProfile(Long deliveryPartnerId, DeliveryProfileDto profileDto);
	
	// get delivery partner id by user id
	public DeliveryResponseDto getDeliveryPartnerId(Long userId);
}
