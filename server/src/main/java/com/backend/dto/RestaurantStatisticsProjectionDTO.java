package com.backend.dto;

public interface RestaurantStatisticsProjectionDTO {
	int getTotalOrders();
	Double getTotalRevenue();
	Double getAverageRating();
}
