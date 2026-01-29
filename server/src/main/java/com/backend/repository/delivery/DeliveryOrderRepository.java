	package com.backend.repository.delivery;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.dto.delivery.DeliveryMiscDto;
import com.backend.dto.delivery.DeliveryTodayOrderStatsDto;
import com.backend.entity.Order;
import com.backend.entity.OrderStatus;

public interface DeliveryOrderRepository extends JpaRepository<Order, Long> {
	public List<Order> findByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
		    Long deliveryPartnerId,
		    LocalDate today,
		    OrderStatus status
		);
	public List<Order> findTop5ByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
		    Long deliveryPartnerId,
		    LocalDate today,
		    OrderStatus status
		);
	public List<Order> findTopByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
		    Long deliveryPartnerId,
		    LocalDate today,
		    OrderStatus status
		);
	public List<Order> findByDeliveryPartnerIdOrderByCreatedOnDesc(Long deliveryPartnerId);
	
	@Query(value="select sum(total_amount)*0.25 from orders where delivery_partner_id=?1 and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery=true)
	public Optional<Double> getTodayPayout(Long deliveryPartnerId);
	
	@Query(value="select count(order_id) from orders where delivery_partner_id=?1 and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery=true)
	public Optional<Integer> getTodayOrderCount(Long deliveryPartnerId);
	
	@Query(value="select avg(total_amount)*0.25 from orders where delivery_partner_id=?1 and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery=true)
	public Optional<Double> getAvgOrderPayout(Long deliveryPartnerId);
	
	@Query(value="select sum(total_amount)*0.25 from orders where delivery_partner_id=?1 and order_status = 'DELIVERED'", nativeQuery=true)
	public Optional<Double> getTotalPayout(Long deliveryPartnerId);
	
	@Query(value="select count(order_id) from orders where delivery_partner_id=?1 and order_status = 'DELIVERED'", nativeQuery=true)
	public Optional<Integer> getTotalOrderCount(Long deliveryPartnerId);
	
	public Optional<Order> findById(Long id);

	public List<Order> findByOrderStatusOrderByCreatedOnDesc(OrderStatus status);
}