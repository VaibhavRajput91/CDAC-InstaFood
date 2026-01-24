package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantStaticsDTO {
	private Long totalOrders;
	private Double totalRevenue;
	private Double averageRating;
}
