package com.backend.service.delivery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryOrderDetailsDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.Order;
import com.backend.repository.delivery.DeliveryOrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor // automatically injects dependencies, no need to auto-wire
public class DeliveryOrderServiceImpl implements DeliveryOrderService {
	private final DeliveryOrderRepository orderRepository;

	@Override
	public List<DeliveryOrderDto> getTodayOrdersList(Long deliveryPartnerId, DeliveryStatus status) {
		LocalDate today = LocalDate.now();
		LocalDateTime startOfDay = today.atStartOfDay();
		LocalDateTime endOfDay = today.atTime(LocalTime.MAX);
		
		List<Order> orders = orderRepository.findByDeliveryPartnerIdAndCreatedOnBetween(deliveryPartnerId, startOfDay, endOfDay); 
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

	@Override
	public DeliveryOrderDetailsDto getOrderDetails(Long orderId) {
		
		return null;
	}

}
