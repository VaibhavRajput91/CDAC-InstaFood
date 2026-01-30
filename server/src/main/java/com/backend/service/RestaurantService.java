package com.backend.service;

import java.util.List;

import com.backend.dto.*;

public interface RestaurantService {
	
	String getRestaurantId(Long userId);
	
	RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO);
	String adminApproval(Long restaurantId);
	RestaurantStatisticsDTO restaurantStatistics(Long restaurantId);
	
	List<RestaurantMenuDishesDTO> getMenuDishes(Long restaurantId);
	List<RestaurantMenuDishesDTO> getAvailableMenuDishes(Long id);
	
	String DishAvailability(long menuId,long dishId);
	String deleteMenuDish(long menuId, long dishId);

	List<RestaurantOrdersDTO> getAllOrdersByRestaurant(Long restaurantId);
	
	Long getMenuIdByRestaurantId(Long restaurantId);
	
	
	RestaurantDetailsDTO getRestaurantDetailsById(Long restaurantId);
	String updateRestaurantDetails(Long restaurantId ,RestaurantUpdateDTO updatedRestaurantDetails);
	
	DishDetailsDTO getDishDetailsById(Long menuId,Long dishId);
	String updateDishDetails(Long menuId,Long dishId, DishUpdateDTO updatedDishDetails);
	List<RestaurantListDTO> getAllRestaurants();
	List<RestaurantListDTO> getRestaurantsByPincode(String pincode);
}
