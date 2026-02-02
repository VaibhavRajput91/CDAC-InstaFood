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
import com.backend.dto.delivery.DeliveryResponseDto;
import com.backend.dto.delivery.OrderItemDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.OrderStatus;
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
	public List<DeliveryOrderDto> getTodayOrdersList(Long deliveryPartnerId, OrderStatus status) {
		LocalDate today = LocalDate.now();
		List<Order> orders = new ArrayList<>();
		if(status == OrderStatus.PREPARING) {
			orders = orderRepository.findTop5ByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(deliveryPartnerId, today, status);
		}
		else if(status == OrderStatus.ASSIGNED){
			orders = orderRepository.findTopByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(deliveryPartnerId, today, status);
		}
		else if(status == OrderStatus.DELIVERED) {
			orders = orderRepository.findByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(deliveryPartnerId, today, status);
		}
		List<DeliveryOrderDto> orderDtos = this.mapOrderList(orders);
		
		return orderDtos;
	}

	
	
	@Override
	public List<DeliveryOrderDto> getOrdersHistory(Long deliveryPartnerId, int limit) {
		List<Order> orders = orderRepository.findByDeliveryPartnerIdOrderByCreatedOnDesc(deliveryPartnerId);		
		List<DeliveryOrderDto> orderDtos = this.mapOrderList(orders);

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
			orderDetails.setOrderStatus(order.getOrderStatus());
			return orderDetails;
		}
		else {
			return null;
		}
	}
	
	public List<DeliveryOrderDto> mapOrderList(List<Order> orders){
		List<DeliveryOrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
			DeliveryOrderDto orderDto = new DeliveryOrderDto();
			orderDto.setOrderId(order.getId());
			orderDto.setRestaurantName(order.getRestaurant().getRestaurantName());
			orderDto.setRestaurantAddress(order.getRestaurant().getUser().getAddress().getLineOne());
			orderDto.setTotalAmount(order.getTotalAmount());
			Set<OrderItemDto> items = new HashSet<>();
			Set<OrderItem> orderItems = order.getOrderItems();
			for(OrderItem orderItem : orderItems) {
				OrderItemDto oid = new OrderItemDto();
				oid.setDishId(orderItem.getDish().getId());
				oid.setDishName(orderItem.getDish().getName());
				oid.setPrice(orderItem.getPrice());
				oid.setQuantity(orderItem.getQuantity());
				
				items.add(oid);
			}
			orderDto.setItems(items);
			orderDto.setOrderStatus(order.getOrderStatus());
			orderDto.setTime(order.getLastUpdated());
			
			orderDtos.add(orderDto);
		}
		return orderDtos;
	}



	@Override
	public DeliveryResponseDto deliverOrder(Long orderId) {
		orderRepository.updateOrderStatus(orderId, OrderStatus.DELIVERED);
		return new DeliveryResponseDto("SUCCESS", "Order Updated Successfully to delivered", null);
	}



	@Override
	public DeliveryResponseDto getOrdersByStatus(Long deliveryPartnerId, OrderStatus status) {
		List<Order> orders = orderRepository.findByDeliveryPartnerIdAndOrderStatus(deliveryPartnerId, status);
		List<DeliveryOrderDto> orderDtos = this.mapOrderList(orders);
		return new DeliveryResponseDto("SUCCESS", null, orderDtos);
	}
	
	
	
}
