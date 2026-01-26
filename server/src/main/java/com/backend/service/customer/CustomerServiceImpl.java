package com.backend.service.customer;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.customer.PlaceOrderDTO;
import com.backend.dto.customer.PlaceOrderResponseDTO;
import com.backend.dto.customer.UserProfileDTO;
import com.backend.entity.Address;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.Dish;
import com.backend.entity.Menu;
import com.backend.entity.MenuDish;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.OrderStatus;
import com.backend.entity.Restaurant;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.MenuDishRepository;
import com.backend.repository.MenuRepository;
import com.backend.repository.OrderItemRepository;
import com.backend.repository.OrderRepository;
import com.backend.repository.RestaurantRepository;
import com.backend.repository.UserRepository;
import com.backend.repository.delivery.DeliveryProfileRepository;
import com.backend.repository.delivery.DeliveryUserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final RestaurantRepository restaurantRepository;
	private final OrderItemRepository orderItemRepository;
	private final MenuRepository menuRepository;
	private final MenuDishRepository menuDishRepository;
	private final DeliveryProfileRepository deliveryProfileRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public UserProfileDTO getCustomerById(Long userId) {
		User user = userRepository.findByIdAndRole(userId, UserRole.ROLE_CUSTOMER).orElseThrow(()->new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User Not Found"
            ));
		System.out.println(user);
		UserProfileDTO userProfile = modelMapper.map(user, UserProfileDTO.class);
		Address addr = user.getAddress();
		userProfile.setCity(addr.getCity());
		userProfile.setLineOne(addr.getLineOne());
		userProfile.setLineTwo(addr.getLineTwo());
		userProfile.setPostalCode(addr.getPostalCode());
		userProfile.setState(addr.getState());
		return userProfile;
	}
	@Override
	public PlaceOrderResponseDTO placeOrder(PlaceOrderDTO placedOrdered) {
		Order order = new Order();
		Dish dish = new Dish();
		MenuDish menuDish = new MenuDish();
		double totalAmount = 0.0;
		Restaurant restaurant = restaurantRepository.findById(placedOrdered.getRestaurantId()).orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"Restaurant Not Found"
			));
		User customer = userRepository.findByIdAndRole(placedOrdered.getCustomerId(), UserRole.ROLE_CUSTOMER).orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"Customer Not Found"
			));
		DeliveryPartner delivery = deliveryProfileRepository.findById((long) 1).orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"Delivery Partner Not Found"
			));
		
		Menu menu = menuRepository.findByRestaurant(restaurant).orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"Menu Not Found for the Restaurant"
			));
		order.setRestaurant(restaurant);
		order.setCustomer(customer);
		order.setDeliveryPartner(delivery);
		order.setTotalAmount(placedOrdered.getTotalAmount());
		order.setOrderStatus(OrderStatus.PLACED);
		orderRepository.save(order);
		for (Long dishId : placedOrdered.getItems().keySet()) {
			OrderItem orderItem = new OrderItem();
			int quantity = placedOrdered.getItems().get(dishId);
			menuDish = menuDishRepository.findDishByMenuAndDishId(menu, dishId).orElseThrow(()->new ResponseStatusException(
					HttpStatus.NOT_FOUND,
					"Dish Not Found in the Menu for the Restaurant"
				));
			dish = menuDish.getDish();
			orderItem.setOrder(order);
			orderItem.setDish(dish);
			orderItem.setQuantity(quantity);
			double price = menuDishRepository.getPriceByMenuIdAndDishId(menu.getId(), dishId).orElseThrow(()->new ResponseStatusException(
					HttpStatus.NOT_FOUND,
					"Price Not Found for the Dish in the Menu"
				));
			orderItem.setPrice(price);
			totalAmount += price * quantity;
			orderItemRepository.save(orderItem);
		}
		PlaceOrderResponseDTO orderResponse = new PlaceOrderResponseDTO();
		orderResponse.setOrderId(order.getId());
		orderResponse.setAmount(totalAmount);
		order.setTotalAmount(totalAmount);
		orderResponse.setStatusMessage("Order Placed Successfully");
		return orderResponse;
		

	}

}
