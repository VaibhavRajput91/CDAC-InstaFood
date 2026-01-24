package com.backend.dto;

import java.time.LocalDate;
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
	private String CustomerName;
	private LocalDate orderDate;
	Map<String, Integer> items; // item name and quantity
	public Double totalAmount;
	public OrderStatus orderStatus;
	

}
