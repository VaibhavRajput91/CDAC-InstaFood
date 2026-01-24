package com.backend.service.delivery;

import java.util.List;

import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.entity.DeliveryStatus;

public interface DeliveryOrderService {
	// method to get all the today orders accepted by the delivery partner
	public List<DeliveryOrderDto> getTodayOrdersList(int deliveryPartnerId, DeliveryStatus status);
	
	// method to get list of all the orders placed 
	public List<Object> getOrdersHistory(int deliveryPartnerId, int limit);
	
	// method to get all the details for a particular order
	public Object getOrderDetails(int orderId);
}
