package com.backend.repository.delivery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.dto.delivery.DeliveryMiscDto;
import com.backend.dto.delivery.DeliveryTodayOrderStatsDto;
import com.backend.entity.Order;
import com.backend.entity.OrderStatus;

import jakarta.persistence.LockModeType;
import jakarta.transaction.Transactional;

public interface DeliveryOrderRepository extends JpaRepository<Order, Long> {

	@Query("""
			    SELECT DISTINCT o
			    FROM Order o
			    LEFT JOIN FETCH o.orderItems oi
			    LEFT JOIN FETCH oi.dish
			    WHERE o.orderStatus = :status
			      AND o.lastUpdated >= :cutoffTime
			      AND o.restaurant.user.address.postalCode = :postalCode
			    ORDER BY o.lastUpdated DESC
			""")
	List<Order> findAvailableOrders(
			@Param("status") OrderStatus status,
			@Param("cutoffTime") LocalDateTime cutoffTime,
			@Param("postalCode") String postalCode);

	public List<Order> findByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
			Long deliveryPartnerId,
			LocalDate today,
			OrderStatus status);

	public List<Order> findTop5ByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
			Long deliveryPartnerId,
			LocalDate today,
			OrderStatus status);

	public List<Order> findTopByDeliveryPartnerIdAndCreatedOnAndOrderStatusOrderByLastUpdatedDesc(
			Long deliveryPartnerId,
			LocalDate today,
			OrderStatus status);

	public List<Order> findByDeliveryPartnerIdOrderByCreatedOnDesc(Long deliveryPartnerId);

	public List<Order> findByDeliveryPartnerIdAndOrderStatus(Long deliveryPartnerId, OrderStatus status);

	@Query(value = "select count(order_id) * 30.0 from orders where delivery_partner_id=?1 and order_status = 'DELIVERED' and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery = true)
	public Optional<Double> getTodayPayout(Long deliveryPartnerId);

	@Query(value = "select count(order_id) from orders where delivery_partner_id=?1 and order_status = 'DELIVERED' and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery = true)
	public Optional<Integer> getTodayOrderCount(Long deliveryPartnerId);

	@Query(value = "select if(count(order_id) > 0, 30.0, 0.0) from orders where delivery_partner_id=?1 and order_status = 'DELIVERED' and created_at >= CURDATE() and created_at < CURDATE() + INTERVAL 1 DAY", nativeQuery = true)
	public Optional<Double> getAvgOrderPayout(Long deliveryPartnerId);

	@Query(value = "select count(order_id) * 30.0 from orders where delivery_partner_id=?1 and order_status = 'DELIVERED'", nativeQuery = true)
	public Optional<Double> getTotalPayout(Long deliveryPartnerId);

	@Query(value = "select count(order_id) from orders where delivery_partner_id=?1 and order_status = 'DELIVERED'", nativeQuery = true)
	public Optional<Integer> getTotalOrderCount(Long deliveryPartnerId);

	@Lock(LockModeType.PESSIMISTIC_WRITE)
	@Query("SELECT o from Order o WHERE o.id = :orderId")
	public Optional<Order> findByIdForUpdate(@Param("orderId") Long id);

	public List<Order> findByOrderStatusOrderByCreatedOnDesc(OrderStatus status);

	@Modifying
	@Transactional
	@Query("""
			UPDATE Order o
			SET o.orderStatus = :status
			WHERE o.id = :orderId
			""")
	public int updateOrderStatus(Long orderId, OrderStatus status);

}