package com.backend.repository.admin;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.dto.admin.Admin_DeliveryRankingDTO;
import com.backend.entity.Order;
import com.backend.entity.OrderStatus;

public interface AdminDeliveryStatsRepository extends JpaRepository<Order, Long> {

	@Query("""
            SELECT COUNT(*)
            FROM Order o
            JOIN o.deliveryPartner dp
           
            WHERE o.orderStatus = 'DELIVERED'and dp.status IN ("AVAILABLE","UNAVAILABLE")
            GROUP BY o.orderStatus
            
    """)
	long countByOrderStatus(OrderStatus orderStatus);

	    // Derived Query for Weekly Deliveries
	    long countByOrderStatusAndCreatedOnAfter(OrderStatus orderStatus, LocalDate date);

	    @Query("""
	            SELECT new com.backend.dto.admin.Admin_DeliveryRankingDTO(
	                CONCAT(u.firstName, ' ', u.lastName),
	                COUNT(o.id)
	            )
	            FROM Order o
	            JOIN o.deliveryPartner dp
	            JOIN dp.user u
	            WHERE o.orderStatus = 'DELIVERED' and dp.status IN ("AVAILABLE","UNAVAILABLE")
	            GROUP BY dp.id, u.firstName, u.lastName
	            ORDER BY COUNT(o.id) DESC
	    """)
	    List<Admin_DeliveryRankingDTO> getDeliveryPartnerRanking();
}
