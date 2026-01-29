package com.backend.dto.delivery;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.backend.entity.DeliveryStatus;
import com.backend.entity.OrderStatus;

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
	private Set<OrderItemDto> items;
	private OrderStatus orderStatus;
	private LocalDateTime time;
	
	
}
