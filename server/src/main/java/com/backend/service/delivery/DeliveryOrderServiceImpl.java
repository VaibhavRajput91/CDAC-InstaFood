package com.backend.service.delivery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryOrderDetailsDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.dto.delivery.OrderItemDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.repository.delivery.DeliveryOrderRepository;

import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor // automatically injects dependencies, no need to auto-wire
public class DeliveryOrderServiceImpl implements DeliveryOrderService {
	// dependencies
	private final DeliveryOrderRepository orderRepository;

	@Override
	public List<DeliveryOrderDto> getTodayOrdersList(Long deliveryPartnerId, DeliveryStatus status) {
		LocalDate today = LocalDate.now();
		System.out.print(today.toString());
		
		List<Order> orders = orderRepository.findByDeliveryPartnerIdAndCreatedOn(deliveryPartnerId, today); 
		List<DeliveryOrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
			DeliveryOrderDto orderDto = new DeliveryOrderDto();
			orderDto.setOrderId(order.getId());
			orderDto.setRestaurantName(order.getRestaurant().getRestaurantName());
			orderDto.setRestaurantAddress(order.getRestaurant().getUser().getAddress().getLineOne());
			orderDto.setTotalAmount(order.getTotalAmount());
			orderDto.setItems(order.getOrderItems().size());
			orderDto.setDeliveryStatus(order.getDeliveryPartnerLog().getStatus());
			
			orderDtos.add(orderDto);
		}
		return orderDtos;
	}

	@Override
	public List<DeliveryOrderDto> getOrdersHistory(Long deliveryPartnerId, int limit) {
		List<Order> orders = orderRepository.findByDeliveryPartnerIdOrderByCreatedOnDesc(deliveryPartnerId);
		List<DeliveryOrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
			DeliveryOrderDto orderDto = new DeliveryOrderDto();
			orderDto.setOrderId(order.getId());
			orderDto.setRestaurantName(order.getRestaurant().getRestaurantName());
			orderDto.setRestaurantAddress(order.getRestaurant().getUser().getAddress().getLineOne());
			orderDto.setTotalAmount(order.getTotalAmount());
			orderDto.setItems(order.getOrderItems().size());
			orderDto.setDeliveryStatus(order.getDeliveryPartnerLog().getStatus());
			
			orderDtos.add(orderDto);
		}
		return orderDtos;
	}

	@Transactional
	@Override
	public DeliveryOrderDetailsDto getOrderDetails(Long orderId) {
		Order order = orderRepository.findById(orderId).orElse(null);
		if(order != null) {
			
			DeliveryOrderDetailsDto orderDetails = new DeliveryOrderDetailsDto();
			orderDetails.setPickup(order.getRestaurant().getUser().getAddress().getLineOne());
			orderDetails.setDrop(order.getCustomer().getAddress().getLineOne());
			orderDetails.setCustomerName(order.getCustomer().getFirstName() + " " + order.getCustomer().getLastName());
			orderDetails.setCustomerPhone(order.getCustomer().getPhone());
			orderDetails.setRestaurantName(order.getRestaurant().getRestaurantName());
			
			Set<OrderItemDto> items = new HashSet<>();
			for(OrderItem item : order.getOrderItems()) {
				OrderItemDto orderItemDto = new OrderItemDto();
				orderItemDto.setDishId(item.getDish().getId());
				orderItemDto.setDishName(item.getDish().getName());
				orderItemDto.setPrice(item.getPrice());
				orderItemDto.setQuantity(item.getQuantity());
				
				items.add(orderItemDto);
			}
			
			orderDetails.setOrderItems(items);
			return orderDetails;
		}
		else {
			return null;
		}
	}

}
