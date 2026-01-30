package com.backend.service.delivery;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryDashboardSummaryDto;
import com.backend.dto.delivery.DeliveryOrderDto;
import com.backend.dto.delivery.DeliveryResponseDto;
import com.backend.dto.delivery.DeliveryStatusDto;
import com.backend.dto.delivery.OrderItemDto;
import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryLog;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.DeliveryStatus;
import com.backend.entity.Order;
import com.backend.entity.OrderItem;
import com.backend.entity.OrderStatus;
import com.backend.repository.delivery.DeliveryOrderRepository;
import com.backend.repository.delivery.DeliveryProfileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryDashboardServiceImpl implements DeliveryDashboardService {

	// dependencies
	private final DeliveryProfileRepository deliveryProfileRepository;
	private final DeliveryOrderRepository deliveryOrderRepository;

	@Override
	public DeliveryDashboardSummaryDto getDeliveryDashboardSummary(Long deliveryPartnerId) {
		DeliveryDashboardSummaryDto summary = new DeliveryDashboardSummaryDto();
		// set the summary details
		summary.getTodayOrderStats()
				.setTodayEarnings(deliveryOrderRepository.getTodayPayout(deliveryPartnerId).orElse(0.0));
		summary.getTodayOrderStats()
				.setTodayOrderCount(deliveryOrderRepository.getTodayOrderCount(deliveryPartnerId).orElse(0));
		summary.getTodayOrderStats()
				.setAvgOrderPayout(deliveryOrderRepository.getAvgOrderPayout(deliveryPartnerId).orElse(0.0));

		summary.getMiscStats().setTotalEarnings(deliveryOrderRepository.getTotalPayout(deliveryPartnerId).orElse(0.0));
		summary.getMiscStats()
				.setTotalOrdersCount(deliveryOrderRepository.getTotalOrderCount(deliveryPartnerId).orElse(0));

		return summary;
	}

	@Override
	public List<DeliveryOrderDto> getNewAvailableDeliveryRequests(Long deliveryPartnerId) { // Updated signature in
																							// interface separately?
																							// Check step.
		// Wait, I need to update the interface method signature too if I haven't.
		// User didn't explicitly ask for interface update in plan, but it's required
		// for compilation.
		// I'll update interface in next tool call if missed.
		// Assuming signature is updated or I will do it.

		DeliveryPartner partner = deliveryProfileRepository.findById(deliveryPartnerId)
				.orElseThrow(() -> new RuntimeException("Delivery Partner not found"));

		String postalCode = partner.getUser().getAddress().getPostalCode();

		List<Order> orders = deliveryOrderRepository
				.findByOrderStatusAndCreatedOnAndRestaurantUserAddressPostalCodeOrderByCreatedOnDesc(
						OrderStatus.ACCEPTED,
						java.time.LocalDate.now(),
						postalCode);

		List<DeliveryOrderDto> orderDtos = orders.stream()
				.map(order -> {
					DeliveryOrderDto dto = new DeliveryOrderDto();
					dto.setOrderId(order.getId());
					dto.setRestaurantName(order.getRestaurant().getRestaurantName());
					dto.setRestaurantAddress(order.getRestaurant().getUser().getAddress().getLineOne());
					dto.setTotalAmount(order.getTotalAmount());
					Set<OrderItemDto> items = new HashSet<>();
					for (OrderItem item : order.getOrderItems()) {
						OrderItemDto orderItemDto = new OrderItemDto();
						orderItemDto.setDishId(item.getDish().getId());
						orderItemDto.setDishName(item.getDish().getName());
						orderItemDto.setPrice(item.getPrice());
						orderItemDto.setQuantity(item.getQuantity());

						items.add(orderItemDto);
					}
					dto.setItems(items);
					dto.setOrderStatus(OrderStatus.ACCEPTED);
					return dto;
				})
				.toList();
		return orderDtos;
	}

	@Override
	@Transactional
	public DeliveryResponseDto acceptDeliveryRequest(Long deliveryPartnerId, Long orderId) {

		Order order = deliveryOrderRepository.findByIdForUpdate(orderId)
				.orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

		// Check if already accepted
		if (order.getDeliveryPartner() != null ||
				order.getOrderStatus() == OrderStatus.ASSIGNED) {

			throw new RuntimeException("Order already accepted by another delivery partner");
		}

		DeliveryPartner deliveryPartner = deliveryProfileRepository.findById(deliveryPartnerId)
				.orElseThrow(() -> new RuntimeException(
						"Delivery partner not found with id: " + deliveryPartnerId));

		order.setDeliveryPartner(deliveryPartner);
		order.setOrderStatus(OrderStatus.ASSIGNED);

		deliveryOrderRepository.save(order);

		return new DeliveryResponseDto(
				"SUCCESS",
				"Delivery request accepted successfully",
				null);
	}

	@Override
	public DeliveryStatusDto getDeliveryPartnerStatus(Long deliveryPartnerId) {

		DeliveryPartner deliveryPartner = deliveryProfileRepository.findById(deliveryPartnerId)
				.orElseThrow(() -> new RuntimeException("Delivery partner not found with id: " + deliveryPartnerId));
		DeliveryStatusDto statusDto = new DeliveryStatusDto();
		statusDto.setStatus(deliveryPartner.getStatus());
		return statusDto;
	}

	@Override
	public DeliveryStatusDto toggleDeliveryPartnerStatus(Long deliveryPartnerId) {

		DeliveryPartner deliveryPartner = deliveryProfileRepository.findById(deliveryPartnerId)
				.orElseThrow(() -> new RuntimeException("Delivery partner not found with id: " + deliveryPartnerId));
		AvailabilityStatus currentStatus = deliveryPartner.getStatus();
		if (currentStatus == AvailabilityStatus.AVAILABLE) {
			deliveryPartner.setStatus(AvailabilityStatus.UNAVAILABLE);
		} else if (currentStatus == AvailabilityStatus.UNAVAILABLE) {
			deliveryPartner.setStatus(AvailabilityStatus.AVAILABLE);
		}

		deliveryProfileRepository.save(deliveryPartner);

		DeliveryStatusDto statusDto = new DeliveryStatusDto();
		statusDto.setStatus(deliveryPartner.getStatus());
		return statusDto;
	}

}