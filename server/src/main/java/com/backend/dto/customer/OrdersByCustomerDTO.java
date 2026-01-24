package com.backend.dto.customer;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import com.backend.entity.OrderStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrdersByCustomerDTO {

	private String restaurantName;
	private String deliveryName;	
	private LocalDate orderDate;
	private Double totalAmount;
	private Map<String, Integer> dishesWithQuantities;
	private OrderStatus orderStatus;
}
