package com.backend.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.dto.*;
import com.backend.entity.*;
import com.backend.entity.Category;
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
	private final DishRepository dishRepository;
	private final MenuRepository menuRepository;
	private final MenuDishRepository menuDishRepository; 
	private final CategoryRepository categoryRepository; 
	
	@Override
	public String getRestaurantId(Long userId) {
		Long id=restaurantRepository.findRestaurantIdByUserId(userId);
		return id.toString();
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

		if (applyDTO.getRestaurantImage() != null && !applyDTO.getRestaurantImage().isEmpty()) {
			String base64Image = applyDTO.getRestaurantImage();
			if (base64Image.contains(",")) {
				base64Image = base64Image.split(",")[1];
			}
			try {
				eligibleRestaurant.setRestaurantImage(java.util.Base64.getDecoder().decode(base64Image));
			} catch (IllegalArgumentException e) {
				throw new RuntimeException("Invalid restaurant image format");
			}
		}
		
		Restaurant saved=restaurantRepository.save(eligibleRestaurant);
		
		return new RestaurantApiResponseDTO("Success","Restaurant added with id-"+saved.getId());
	}
	
	@Override
	public String adminApproval(Long restaurantId) {
		Restaurant restaurant=restaurantRepository.findById(restaurantId)
				.orElseThrow(()-> new RuntimeException("Restaurant not found"));
		return restaurant.getStatus().toString();
	}
	
	
	@Override
	public RestaurantStatisticsDTO restaurantStatistics(Long restaurantId) {
		RestaurantStatisticsProjectionDTO stats=restaurantRepository.reviews(restaurantId);
		return new RestaurantStatisticsDTO(stats.getTotalOrders(), stats.getTotalRevenue(),stats.getAverageRating());
	}
	
	@Override
	public List<RestaurantMenuDishesDTO> getMenuDishes(Long restaurantId) {
		return restaurantRepository.findMenuDishesByRestaurantId(restaurantId);
	}
	@Override
	public List<RestaurantMenuDishesDTO> getAvailableMenuDishes(Long id) {
		return restaurantRepository.findAvailableMenuDishesByRestaurantId(id);
		
	}
	
	
	@Override
	public String DishAvailability(long menuId,long dishId) {
		int rowsAffected=restaurantRepository.changeAvailability(menuId,dishId);
		return "Rows Affected : "+rowsAffected;
	}
	
	@Override
	public String deleteMenuDish(long menuId, long dishId) {
		int rowsAffected=restaurantRepository.deleteDish(menuId, dishId);
		return "Rows Affected : "+rowsAffected;
	}
	
	private String formatAddress(Address address) {
	    if (address == null) {
	        return null;
	    }
	    StringBuilder sb = new StringBuilder();
	    if (address.getLineOne() != null) {
	        sb.append(address.getLineOne());
	    }
	    if (address.getLineTwo() != null && !address.getLineTwo().isBlank()) {
	        sb.append(", ").append(address.getLineTwo());
	    }
	    if (address.getCity() != null) {
	        sb.append(", ").append(address.getCity());
	    }
	    if (address.getState() != null) {
	        sb.append(", ").append(address.getState());
	    }
	    if (address.getPostalCode() != null) {
	        sb.append(" - ").append(address.getPostalCode());
	    }
	    return sb.toString();
	}

	
	

	

	@Override
	public RestaurantDetailsDTO getRestaurantDetailsById(Long restaurantId) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));
		
		RestaurantDetailsDTO restaurantDetails = new RestaurantDetailsDTO();
		restaurantDetails.setEmail(restaurant.getUser().getEmail());
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

		if (restaurant.getRestaurantImage() != null) {
			String base64Image = java.util.Base64.getEncoder().encodeToString(restaurant.getRestaurantImage());
			restaurantDetails.setRestaurantImage("data:image/jpeg;base64," + base64Image);
		}
		
		return restaurantDetails;
	}
	
	@Override
	public String updateRestaurantDetails(Long restaurantId, RestaurantUpdateDTO updatedRestaurantDetails) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
				.orElseThrow(() -> new RuntimeException("Restaurant not found"));
		restaurant.setRestaurantName(updatedRestaurantDetails.getRestaurantName());
		
		User user = restaurant.getUser();
		user.setFirstName(updatedRestaurantDetails.getFirstName());
		user.setLastName(updatedRestaurantDetails.getLastName());
		user.setPhone(updatedRestaurantDetails.getPhone());
		
		Address address = user.getAddress();
		address.setLineOne(updatedRestaurantDetails.getLineOne());
		address.setLineTwo(updatedRestaurantDetails.getLineTwo());
		address.setCity(updatedRestaurantDetails.getCity());
		address.setState(updatedRestaurantDetails.getState());
		address.setPostalCode(updatedRestaurantDetails.getPostalCode());
		
		restaurant.setOpeningTime(updatedRestaurantDetails.getOpeningTime());
		restaurant.setClosingTime(updatedRestaurantDetails.getClosingTime());

		if (updatedRestaurantDetails.getRestaurantImage() != null && !updatedRestaurantDetails.getRestaurantImage().isEmpty()) {
			String base64Image = updatedRestaurantDetails.getRestaurantImage();
			if (base64Image.contains(",")) {
				base64Image = base64Image.split(",")[1];
			}
			try {
				restaurant.setRestaurantImage(java.util.Base64.getDecoder().decode(base64Image));
			} catch (IllegalArgumentException e) {
				throw new RuntimeException("Invalid restaurant image format");
			}
		}
		
		addressRepository.save(address);
		userRepository.save(user);
		restaurantRepository.save(restaurant);
		
		
		return "Restaurant details updated successfully";
	}
	
	@Override
	public DishDetailsDTO getDishDetailsById(Long menuId,Long dishId) {
		DishDetailsDTO dishDetails = new DishDetailsDTO();
		Menu menu = menuRepository.findById(menuId)
				.orElseThrow(() -> new RuntimeException("Menu not found"));
		List<MenuDish> menudishes = menu.getMenuDishes();
		for (MenuDish md : menudishes) {
			if (md.getDish().getId().equals(dishId)) {
				Dish dish = md.getDish();
				dishDetails.setId(dish.getId());
				dishDetails.setName(dish.getName());
				dishDetails.setDescription(md.getDescription());
				dishDetails.setPrice(md.getPrice());
				dishDetails.setAvailable(md.isAvailable());
			}
		}
		return dishDetails;	
	}

	@Override
	public String updateDishDetails(Long menuId, Long dishId, DishUpdateDTO dto) {
		menuDishRepository.updateDishDetails(menuId, dishId, dto.getDescription(), dto.getPrice());
		return "Dish details updated successfully";
	}

	@Override
	public List<RestaurantListDTO> getAllRestaurants() {
		List<Restaurant> restaurants = restaurantRepository.findAll();
		List<RestaurantListDTO> restaurantDTOs = new ArrayList<>();
		for (Restaurant restaurant : restaurants) {
			RestaurantListDTO dto = new RestaurantListDTO();
			dto.setId(restaurant.getId());
			dto.setName(restaurant.getRestaurantName());
			dto.setOpeningTime(restaurant.getOpeningTime());
			dto.setClosingTime(restaurant.getClosingTime());
			Address address = restaurant.getUser().getAddress();
			if (address != null) {
				dto.setPostalCode(address.getPostalCode());
			}
			if (restaurant.getRestaurantImage() != null) {
				String base64Image = java.util.Base64.getEncoder().encodeToString(restaurant.getRestaurantImage());
				dto.setRestaurantImage("data:image/jpeg;base64," + base64Image);
			}
			restaurantDTOs.add(dto);
			// You can add dto to a list and return the list if needed
		}
		return restaurantDTOs;
	}

	

	@Override
	public List<RestaurantListDTO> getRestaurantsByPincode(String pincode) {
		List<Restaurant> restaurants = restaurantRepository.findByUserAddressPostalCode(pincode);
		List<RestaurantListDTO> restaurantDTOs = new ArrayList<>();
		for (Restaurant restaurant : restaurants) {
			RestaurantListDTO dto = new RestaurantListDTO();
			dto.setId(restaurant.getId());
			dto.setName(restaurant.getRestaurantName());
			dto.setOpeningTime(restaurant.getOpeningTime());
			dto.setClosingTime(restaurant.getClosingTime());
			Address address = restaurant.getUser().getAddress();
			if (address != null) {
				dto.setPostalCode(address.getPostalCode());
			}
			if (restaurant.getRestaurantImage() != null) {
				String base64Image = java.util.Base64.getEncoder().encodeToString(restaurant.getRestaurantImage());
				dto.setRestaurantImage("data:image/jpeg;base64," + base64Image);
			}
			restaurantDTOs.add(dto);
		}
		return restaurantDTOs;
	}

	@Override
	public Long getMenuIdByRestaurantId(Long restaurantId) {
		Restaurant restaurant = restaurantRepository.findById(restaurantId)
	            .orElseThrow(() -> new RuntimeException("Restaurant not found"));

	    Menu menu = menuRepository.findByRestaurant(restaurant)
	            .orElseGet(() -> {
	                Menu newMenu = new Menu();
	                newMenu.setRestaurant(restaurant);
	                newMenu.setActive(true);
	                return menuRepository.save(newMenu);
	            });

	    return menu.getId();
	}
	
	@Override
	public List<RestaurantDishCategoryDTO> getDishCategories() {
	    return categoryRepository.findAll()
	            .stream()
	            .map(c -> {
	            	RestaurantDishCategoryDTO dto = new RestaurantDishCategoryDTO();
	                dto.setId(c.getId());
	                dto.setName(c.getName());
	                return dto;
	            })
	            .toList();
	}

	@Override
	public String addNewDish(Long menuId, RestaurantAddDishDTO dishDTO) {
		Menu menu = menuRepository.findById(menuId)
	            .orElseThrow(() -> new RuntimeException("Menu not found"));
		
		Dish dish=new Dish();
		dish.setName(dishDTO.getName());
	    
	    Set<Category> managedCategories = categoryRepository
	            .findAllById(dishDTO.getCategoryIds())
	            .stream()
	            .collect(Collectors.toSet());

	    dish.setCategories(managedCategories);
	    
	    Dish savedDish=dishRepository.save(dish);
	    MenuDish menuDish = new MenuDish();

	    MenuDishId id = new MenuDishId();
	    id.setMenuId(menu.getId());
	    id.setDishId(savedDish.getId());

	    menuDish.setId(id);
	    menuDish.setMenu(menu);
	    menuDish.setDish(savedDish);
	    menuDish.setDescription(dishDTO.getDescription());
	    menuDish.setPrice(dishDTO.getPrice());
	    menuDish.setAvailable(true);

	    menuDishRepository.save(menuDish);

	    return "Dish added successfully";
	}

	@Override
	public String RestaurantAvailability(Long restaurantId) {
		int rowsAffected=restaurantRepository.changeRestaurantAvailability(restaurantId);
		return "Rows Affected : "+rowsAffected;
	}

	@Override
	public List<RestaurantOrdersDTO> getAllPlacedOrders(Long restaurantId) {
		List<Order> orders =orderRepository.findAllPlacedOrders(restaurantId);
	    return orders.stream().map(order -> {
	        User customer = order.getCustomer();
	        String customerName = customer.getFirstName() +
	                (customer.getLastName() != null
	                        ? " " + customer.getLastName()
	                        : "");
	        String address = formatAddress(customer.getAddress());
	        Map<String, Integer> items = order.getOrderItems()
	                .stream()
	                .collect(Collectors.toMap(
	                        oi -> oi.getDish().getName(),
	                        oi -> oi.getQuantity(),
	                        Integer::sum
	                ));
	        return new RestaurantOrdersDTO(
	                order.getId(),
	                customerName,
	                address,
	                order.getCreatedOn(),     
	                items,
	                order.getTotalAmount(),
	                null,                    
	                null,                   
	                order.getOrderStatus()
	        );
	    }).toList();
	}

	@Override
	public List<RestaurantOrdersDTO> getAllAcceptedOrders(Long restaurantId) {
		List<Order> orders =orderRepository.findAllAcceptedOrders(restaurantId);
	    return orders.stream().map(order -> {
	        User customer = order.getCustomer();
	        String customerName = customer.getFirstName() +
	                (customer.getLastName() != null
	                        ? " " + customer.getLastName()
	                        : "");
	        String address = formatAddress(customer.getAddress());
	        Map<String, Integer> items = order.getOrderItems()
	                .stream()
	                .collect(Collectors.toMap(
	                        oi -> oi.getDish().getName(),
	                        oi -> oi.getQuantity(),
	                        Integer::sum
	                ));
	        return new RestaurantOrdersDTO(
	                order.getId(),
	                customerName,
	                address,
	                order.getCreatedOn(),     
	                items,
	                order.getTotalAmount(),
	                null,                  
	                null,                  
	                order.getOrderStatus()
	        );
	    }).toList();
	}
	
	@Override
	public List<RestaurantOrdersDTO> getAllPreparingOrders(Long restaurantId) {
		List<Order> orders =orderRepository.findAllPreparingOrders(restaurantId);
	    return orders.stream().map(order -> {
	        User customer = order.getCustomer();
	        String customerName = customer.getFirstName() +
	                (customer.getLastName() != null
	                        ? " " + customer.getLastName()
	                        : "");
	        String address = formatAddress(customer.getAddress());
	        Map<String, Integer> items = order.getOrderItems()
	                .stream()
	                .collect(Collectors.toMap(
	                        oi -> oi.getDish().getName(),
	                        oi -> oi.getQuantity(),
	                        Integer::sum
	                ));
	        return new RestaurantOrdersDTO(
	                order.getId(),
	                customerName,
	                address,
	                order.getCreatedOn(),     
	                items,
	                order.getTotalAmount(),
	                null,                  
	                null,                  
	                order.getOrderStatus()
	        );
	    }).toList();
	}
	
	@Override
	public List<RestaurantOrdersDTO> getAllAssignedOrders(Long restaurantId) {
		List<Order> orders =orderRepository.findAllAssignedOrders(restaurantId);
	    return orders.stream().map(order -> {
	        User customer = order.getCustomer();
	        String customerName = customer.getFirstName() +(customer.getLastName() != null ? " " + customer.getLastName(): "");
	        String address = formatAddress(customer.getAddress());
	        Map<String, Integer> items = order.getOrderItems()
	                .stream()
	                .collect(Collectors.toMap(
	                        oi -> oi.getDish().getName(),
	                        oi -> oi.getQuantity(),
	                        Integer::sum
	                )); 
	        String deliveryExecutiveName = null;
	        if (order.getDeliveryPartner() != null) {
	            User dpUser = order.getDeliveryPartner().getUser();
	            deliveryExecutiveName = dpUser.getFirstName() +
	                    (dpUser.getLastName() != null
	                            ? " " + dpUser.getLastName()
	                            : "");
	        }
	        return new RestaurantOrdersDTO(
	                order.getId(),
	                customerName,
	                address,
	                order.getCreatedOn(),
	                items,
	                order.getTotalAmount(),
	                deliveryExecutiveName,
	                order.getLastUpdated(),
	                order.getOrderStatus()
	        );
	    }).toList();
	}
	
	@Override
	public List<RestaurantOrdersDTO> getAllDeliveredOrders(Long restaurantId) {
		List<Order> orders =orderRepository.findAllDeliveredOrders(restaurantId);
	    return orders.stream().map(order -> {
	        User customer = order.getCustomer();
	        String customerName = customer.getFirstName() +(customer.getLastName() != null ? " " + customer.getLastName(): "");
	        String address = formatAddress(customer.getAddress());
	        Map<String, Integer> items = order.getOrderItems()
	                .stream()
	                .collect(Collectors.toMap(
	                        oi -> oi.getDish().getName(),
	                        oi -> oi.getQuantity(),
	                        Integer::sum
	                )); 
	        String deliveryExecutiveName = null;
	        if (order.getDeliveryPartner() != null) {
	            User dpUser = order.getDeliveryPartner().getUser();
	            deliveryExecutiveName = dpUser.getFirstName() +
	                    (dpUser.getLastName() != null
	                            ? " " + dpUser.getLastName()
	                            : "");
	        }
	        return new RestaurantOrdersDTO(
	                order.getId(),
	                customerName,
	                address,
	                order.getCreatedOn(),
	                items,
	                order.getTotalAmount(),
	                deliveryExecutiveName,
	                order.getLastUpdated(),
	                order.getOrderStatus()
	        );
	    }).toList();
	}

	@Override
	public String acceptingOrderByOrderId(Long orderId) {
		Order order=orderRepository.findById(orderId)
				.orElseThrow(()->new RuntimeException("Order not found;"));
		order.setOrderStatus(OrderStatus.ACCEPTED);
		orderRepository.save(order);
		return "Order Accepted";
	}

	@Override
	public String preparingOrderByOrderId(Long orderId) {
		Order order=orderRepository.findById(orderId)
				.orElseThrow(()->new RuntimeException("Order not found;"));
		order.setOrderStatus(OrderStatus.PREPARING);
		orderRepository.save(order);
		return "Preparing Order";
	}
	
}
