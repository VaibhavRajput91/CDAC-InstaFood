package com.backend.dto.delivery;

import java.util.List;

import com.backend.entity.OrderItem;
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
	// customer details (contact)
	private User customerDetails;
	// order items
	private List<OrderItem> orderItems;
	
	
	public double totalAmount() {
		double totalAmount = 0.0;
		for(OrderItem item : orderItems) {
			totalAmount += item.getPrice() * item.getQuantity();
		}
		return totalAmount;
	}
}
