package com.backend.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin_RestaurantsRankingDTO {
	private Long restaurantId;
    private Long ranking;
    private String name;
    private Double averageRating;
    private Long reviewCount;

}
