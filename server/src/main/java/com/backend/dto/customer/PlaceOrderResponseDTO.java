package com.backend.dto.customer;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class PlaceOrderResponseDTO {
	private Long orderId;
	private Double amount;
	private String statusMessage;

}
