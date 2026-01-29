package com.backend.service.delivery;

import java.util.List;

import com.backend.dto.delivery.DeliveryOrderDetailsDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.OrderStatus;

public interface DeliveryOrderService {
	// method to get all the today orders accepted by the delivery partner
	public List<DeliveryOrderDto> getTodayOrdersList(Long deliveryPartnerId, OrderStatus status);
	
	// method to get list of all the orders placed 
	public List<DeliveryOrderDto> getOrdersHistory(Long deliveryPartnerId, int limit);
	
	// method to get all the details for a particular order
	public DeliveryOrderDetailsDto getOrderDetails(Long orderId);
}
