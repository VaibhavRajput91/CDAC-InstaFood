package com.backend.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

import com.backend.entity.OrderStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantOrdersDTO {
	
	private Long orderId;
	private String customerName;
	private String Address;
	private LocalDate orderDate;
	
	Map<String, Integer> items;
	public Double totalAmount;
	
	private String deliveryExecutiveName;
	private LocalDateTime deliveryDateTime;
	
	public OrderStatus orderStatus;
}
