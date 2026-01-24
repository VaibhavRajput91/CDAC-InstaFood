package com.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.*;
import com.backend.entity.*;
import com.backend.repository.*;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {
	
	private final RestaurantRepository restaurantRepository;
	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final AddressRepository addressRepository;
	
	

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
	
	@Override
	public RestaurantStaticsDTO restaurantStatics(Long id) {
		RestaurantStaticsProjectionDTO stats=restaurantRepository.reviews(id);
		return new RestaurantStaticsDTO(stats.getTotalOrders(), stats.getTotalRevenue(),stats.getAverageRating());
	}
	
	@Override
	public List<RestaurantMenuDishesDTO> getMenuDishes(Long id) {
		return restaurantRepository.findMenuDishesByRestaurantId(id);
	}


	

	@Override
	public List<RestaurantOrdersDTO> getAllOrdersByRestaurant(Long restaurantId) {
		List<RestaurantOrdersDTO> restaurantOrders= new ArrayList<>();
		Map<String, Integer> dishesWithQuantities = new HashMap<>();
		List<Order> orders = orderRepository.findByRestaurantId(restaurantId)
				.orElseThrow(()-> new RuntimeException("No Orders Found for this Restaurant"));
		for(Order order : orders) {
			RestaurantOrdersDTO dto = new RestaurantOrdersDTO();
			dto.setOrderId(order.getId());
			dto.setOrderDate(order.getCreatedOn());
			dto.setCustomerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
			dto.setOrderStatus(order.getOrderStatus());
			dto.setTotalAmount(order.getTotalAmount());
			// Assuming order has a method getOrderItems() that returns list of OrderItem
			order.getOrderItems().forEach(item -> {
				dishesWithQuantities.put(item.getDish().getName(), item.getQuantity());
			});
			dto.setItems(dishesWithQuantities);
			restaurantOrders.add(dto);
		}
		return restaurantOrders;

	}

	@Override
	public String updateRestaurantDetails(Long restaurantId, RestaurantUpdateDTO updatedRestaurantDetails) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));
		restaurant.setRestaurantName(updatedRestaurantDetails.getName());
		restaurant.setOpeningTime(updatedRestaurantDetails.getOpeningTime());
		restaurant.setClosingTime(updatedRestaurantDetails.getClosingTime());
		User user = restaurant.getUser();
		user.setPhone(updatedRestaurantDetails.getPhone());
		Address address = user.getAddress();
		address.setLineOne(updatedRestaurantDetails.getLineOne());
		address.setLineTwo(updatedRestaurantDetails.getLineTwo());
		address.setCity(updatedRestaurantDetails.getCity());
		address.setState(updatedRestaurantDetails.getState());
		address.setPostalCode(updatedRestaurantDetails.getPostalCode());
		addressRepository.save(address);
		userRepository.save(user);
		restaurantRepository.save(restaurant);
		
		
		return "Restaurant details updated successfully";
	}

	@Override
	public RestaurantDetailsDTO getRestaurantDetailsById(Long restaurantId) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));
		RestaurantDetailsDTO restaurantDetails = new RestaurantDetailsDTO();
		restaurantDetails.setRestaurantName(restaurant.getRestaurantName());
		restaurantDetails.setOpeningTime(restaurant.getOpeningTime());
		restaurantDetails.setClosingTime(restaurant.getClosingTime());
		restaurantDetails.setPhone(restaurant.getUser().getPhone());
		restaurantDetails.setFirstName(restaurant.getUser().getFirstName());
		restaurantDetails.setLastName(restaurant.getUser().getLastName());
		Address address = restaurant.getUser().getAddress();
		if (address != null) {
			restaurantDetails.setLineOne(address.getLineOne());
			restaurantDetails.setLineTwo(address.getLineTwo());
			restaurantDetails.setCity(address.getCity());
			restaurantDetails.setState(address.getState());
			restaurantDetails.setPostalCode(address.getPostalCode());		
		}
		
		return restaurantDetails;
	}
}
