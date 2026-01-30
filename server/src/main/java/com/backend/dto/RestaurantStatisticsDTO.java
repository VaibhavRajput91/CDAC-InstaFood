package com.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantStatisticsDTO {
	private int totalOrders;
	private Double totalRevenue;
	private Double averageRating;
}
