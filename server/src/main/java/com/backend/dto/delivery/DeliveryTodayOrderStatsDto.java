package com.backend.dto.delivery;

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
public class DeliveryTodayOrderStatsDto {
	private Double todayEarnings;
	private Integer todayOrderCount;
	private Double avgOrderPayout;
}