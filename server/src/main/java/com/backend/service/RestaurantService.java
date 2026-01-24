package com.backend.service;

import java.util.List;

import com.backend.dto.*;

public interface RestaurantService {
	RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO);
	RestaurantStaticsDTO restaurantStatics(Long id);
	List<RestaurantMenuDishesDTO> getMenuDishes(Long id);

	
	
	
	List<RestaurantOrdersDTO> getAllOrdersByRestaurant(Long restaurantId);
	String updateRestaurantDetails(Long restaurantId ,RestaurantUpdateDTO updatedRestaurantDetails);
	RestaurantDetailsDTO getRestaurantDetailsById(Long restaurantId);
}
