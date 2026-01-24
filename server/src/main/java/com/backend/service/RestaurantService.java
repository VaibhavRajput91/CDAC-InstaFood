package com.backend.service;

import java.util.List;

import com.backend.dto.RestaurantApiResponseDTO;
import com.backend.dto.RestaurantApplyDTO;
import com.backend.dto.RestaurantOrdersDTO;

public interface RestaurantService {
	RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO);
	List<RestaurantOrdersDTO> getAllOrdersByRestaurant(Long restaurantId);
}
