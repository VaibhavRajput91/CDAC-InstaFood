package com.backend.service;

import com.backend.dto.RestaurantApiResponseDTO;
import com.backend.dto.RestaurantApplyDTO;

public interface RestaurantService {
	RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO);
}
