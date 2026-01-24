package com.backend.service.delivery;

import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.entity.DeliveryStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	@Override
	public List<Object> getTodayOrdersList(int deliveryPartnerId, DeliveryStatus status) {
		
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
