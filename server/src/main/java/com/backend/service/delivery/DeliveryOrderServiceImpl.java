package com.backend.service.delivery;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.Order;
import com.backend.repository.delivery.DeliveryOrderRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
// no need to autowire, automatically inject depcy for final fields
@RequiredArgsConstructor
public class DeliveryOrderServiceImpl implements DeliveryOrderService {
	private final DeliveryOrderRepository orderRepository;

	@Override
	public List<DeliveryOrderDto> getTodayOrdersList(int deliveryPartnerId, DeliveryStatus status) {
		List<Order> orders = orderRepository.findByDeliveryPartnerId(deliveryPartnerId); 
		List<DeliveryOrderDto> orderDtos = new ArrayList<>();
		for(Order order : orders) {
			DeliveryOrderDto orderDto = new DeliveryOrderDto();
			orderDto.setOrderId(order.getId());
			orderDto.setRestaurantName(order.getRestaurant().getRestaurantName());
			orderDto.setRestaurantAddress(order.getRestaurant().getUser().getAddress().getLineOne());
			orderDto.setTotalAmount(order.getTotalAmount());
			orderDto.setItems(order.getOrderItems().size());
			orderDto.setDeliveryStatus(order.getDeliveryPartnerLog().getStatus());
		}
		return null;
	}

	@Override
	public List<Object> getOrdersHistory(int deliveryPartnerId, int limit) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getOrderDetails(int orderId) {
		// TODO Auto-generated method stub
		return null;
	}

}
