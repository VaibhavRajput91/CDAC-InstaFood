package com.backend.service.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.backend.dto.customer.OrdersByCustomerDTO;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.User;
import com.backend.repository.DishRepository;
import com.backend.repository.OrderItemRepository;
import com.backend.repository.OrderRepository;
import com.backend.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerOrderServiceImpl implements CustomerOrderService {

	
	private final UserRepository userRepository;
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final DishRepository dishRepository;
	
	@Override
	public OrdersByCustomerDTO getAllOrdersByCustomer(Long customerId) {
		
		OrdersByCustomerDTO ordersByCustomer = new OrdersByCustomerDTO();
		Map<String, Integer> dishesWithQuantities = new HashMap<>();
		User customer = userRepository.findById(customerId)
				.orElseThrow(()->new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User Not Found"
            ));
		Order currentOrder = orderRepository.findByCustomer(customer)
				.orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"No Orders Found for this Customer"
			));
		ordersByCustomer.setOrderDate(currentOrder.getCreatedOn());
		ordersByCustomer.setRestaurantName(currentOrder.getRestaurant().getRestaurantName());
		ordersByCustomer.setDeliveryName(currentOrder.getDeliveryPartner().getUser().getFirstName() 
				+ " " + 
				currentOrder.getDeliveryPartner().getUser().getLastName());
		ordersByCustomer.setOrderStatus(currentOrder.getOrderStatus());
		ordersByCustomer.setTotalAmount(currentOrder.getTotalAmount());
		List<OrderItem> orderItems = orderItemRepository.findByOrderId(currentOrder.getId())
				.orElseThrow(()->new ResponseStatusException(
				HttpStatus.NOT_FOUND,
				"No Order Items Found for this Order"
			));
		for(OrderItem item : orderItems) {
			dishesWithQuantities.put(item.getDish().getName(), item.getQuantity());
		}
		ordersByCustomer.setDishesWithQuantities(dishesWithQuantities);
		
		
		return ordersByCustomer;
	}

}
