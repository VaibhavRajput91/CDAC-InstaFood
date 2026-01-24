package com.backend.service.delivery;

import java.util.List;

import com.backend.entity.DeliveryStatus;

public interface OrderService {
	// method to get all the today orders accepted by the delivery partner
	public List<Object> getTodayOrdersList(int deliveryPartnerId, DeliveryStatus status);
	
	// method to get list of all the orders placed 
	public List<Object> getOrdersHistory(int deliveryPartnerId, int limit);
	
	// method to get all the details for a particular order
	public Object getOrderDetails(int orderId);
}
