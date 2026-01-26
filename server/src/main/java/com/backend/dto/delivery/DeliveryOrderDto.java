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
public class DeliveryOrderDto {
	private Long orderId;
	private String restaurantName;
	private String restaurantAddress;
	private double totalAmount;
	private int items;
	private DeliveryStatus deliveryStatus;
	
	
}
