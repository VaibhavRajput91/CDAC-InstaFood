package com.backend.dto.delivery;

import java.util.Set;

import com.backend.entity.OrderItem;
import com.backend.entity.OrderStatus;
import com.backend.entity.Restaurant;
import com.backend.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryOrderDetailsDto {
	// restaurant address(complete)
	private String pickup;
	// customer address(complete)
	private String drop;
	// restaurant name
	private String restaurantName;
	// customer details
	private String customerName;
	private String customerPhone;
	// order items
	private Set<OrderItemDto> orderItems;
	// order status
	private OrderStatus orderStatus;
	
	
	public double totalAmount() {
		double totalAmount = 0.0;
		for(OrderItemDto item : orderItems) {
			totalAmount += item.getPrice() * item.getQuantity();
		}
		return totalAmount;
	}
}
