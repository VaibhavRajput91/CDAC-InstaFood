package com.backend.service;

import java.util.List;

import com.backend.dto.RestaurantApiResponseDTO;
import com.backend.dto.RestaurantApplyDTO;
import com.backend.dto.RestaurantDetailsDTO;
import com.backend.dto.RestaurantOrdersDTO;
import com.backend.dto.RestaurantStaticsDTO;
import com.backend.dto.RestaurantUpdateDTO;

public interface RestaurantService {
	RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO);
	RestaurantStaticsDTO restaurantStatics(Long id);
	List<RestaurantOrdersDTO> getAllOrdersByRestaurant(Long restaurantId);
	String updateRestaurantDetails(Long restaurantId ,RestaurantUpdateDTO updatedRestaurantDetails);
	RestaurantDetailsDTO getRestaurantDetailsById(Long restaurantId);
}
