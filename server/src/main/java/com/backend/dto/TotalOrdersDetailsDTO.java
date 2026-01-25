package com.backend.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TotalOrdersDetailsDTO {

	 Long totalOrders;
	double totalMoneySpent;
	Long totalDishesOffered;
	Long totalCategoriesOffered;
	
	public TotalOrdersDetailsDTO(Long totalOrders, Double totalMoneySpent)
	{
		this.totalOrders=totalOrders;
		this.totalMoneySpent=totalMoneySpent;

	}
}
