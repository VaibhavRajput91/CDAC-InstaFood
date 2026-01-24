package com.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.RestaurantApiResponseDTO;
import com.backend.dto.RestaurantApplyDTO;
import com.backend.entity.*;
import com.backend.repository.*;

@Service
@Transactional
public class RestaurantServiceImpl implements RestaurantService {
	
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;
	
	public RestaurantServiceImpl(RestaurantRepository restaurantRepository,UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
    }

	@Override
	public RestaurantApiResponseDTO restaurantApply(RestaurantApplyDTO applyDTO) {
		
		User user=userRepository
				.findByIdAndRole(applyDTO.getUserId(),UserRole.ROLE_RESTAURANT)
				.orElseThrow(()-> new RuntimeException("User not found or not a restaurant role"));
		
		Restaurant eligibleRestaurant=new Restaurant();
		eligibleRestaurant.setUser(user);
		eligibleRestaurant.setRestaurantName(applyDTO.getRestaurantName());
		eligibleRestaurant.setOpeningTime(applyDTO.getOpeningTime());
		eligibleRestaurant.setClosingTime(applyDTO.getClosingTime());
		eligibleRestaurant.setStatus(applyDTO.getStatus());
		
		Restaurant saved=restaurantRepository.save(eligibleRestaurant);
		
		return new RestaurantApiResponseDTO("Success","Restaurant added with id-"+saved.getId());
	}
}
