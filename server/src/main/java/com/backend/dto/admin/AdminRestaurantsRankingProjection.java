package com.backend.dto.admin;

public interface AdminRestaurantsRankingProjection {
	Long getRestaurantId();
    Long getRanking();
    String getName();
    Double getAverageRating();
    Long getReviewCount();
}
