package com.backend.dto.customer;

import java.util.Map;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PlaceOrderDTO {
	private Long restaurantId;
	private Long customerId;
	private Map<Long, Integer> items; 
	private Double totalAmount;

}
