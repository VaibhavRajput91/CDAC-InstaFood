package com.backend.dto.delivery;

import com.backend.entity.DeliveryStatus;

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
public class OrderDto {
	private int orderId;
	private String restaurantName;
	private String restaurantAddress;
	private double total_amount;
	private int items;
	private DeliveryStatus deliveryStatus;
}
