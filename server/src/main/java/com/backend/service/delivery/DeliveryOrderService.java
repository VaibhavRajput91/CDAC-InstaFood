package com.backend.service.delivery;

import java.util.List;

import com.backend.dto.delivery.DeliveryOrderDetailsDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.dto.delivery.DeliveryResponseDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.OrderStatus;

public interface DeliveryOrderService {
	// method to get all the today orders accepted by the delivery partner
	public List<DeliveryOrderDto> getTodayOrdersList(Long deliveryPartnerId, OrderStatus status);
	
	// method to get list of all the orders placed 
	public List<DeliveryOrderDto> getOrdersHistory(Long deliveryPartnerId, int limit);
	
	// method to get all the details for a particular order
	public DeliveryOrderDetailsDto getOrderDetails(Long orderId);
	
	// method to set the delivery status to Delivered
	public DeliveryResponseDto deliverOrder(Long orderId);
	
	// method to get the orders by delivery partner id and order status type
	public DeliveryResponseDto getOrdersByStatus(Long deliveryPartnerId, OrderStatus status);
}
