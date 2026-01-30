package com.backend.service.delivery;

import java.util.List;

import com.backend.dto.delivery.DeliveryDashboardSummaryDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.dto.delivery.DeliveryResponseDto;
import com.backend.dto.delivery.DeliveryStatusDto;

public interface DeliveryDashboardService {
	
	// method to get delivery dashboard summary
	public DeliveryDashboardSummaryDto getDeliveryDashboardSummary(Long deliveryPartnerId);
	
	// method to get new available delivery requests
	public List<DeliveryOrderDto> getNewAvailableDeliveryRequests(Long deliveryPartnerId);
	
	// accept a delivery request
	public DeliveryResponseDto acceptDeliveryRequest(Long deliveryPartnerId, Long orderId);
	
	// get delivery partner's availability status
	public DeliveryStatusDto getDeliveryPartnerStatus(Long deliveryPartnerId);
	
	// toggle delivery partner's availability status between AVAILABLE and UNAVAILABLE
	public DeliveryStatusDto toggleDeliveryPartnerStatus(Long deliveryPartnerId);
	
}
