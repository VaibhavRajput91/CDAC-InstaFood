package com.backend.repository.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.backend.dto.admin.DashboardOrdersPerDayDTO;
import com.backend.entity.Order;

public interface AdminDashboardOrderRepository extends JpaRepository<Order, Long> {

	@Query("""
            SELECT new com.backend.dto.admin.DashboardOrdersPerDayDTO(o.createdOn, COUNT(o.id))
            FROM Order o
            JOIN o.deliveryPartner dp
          
            WHERE o.orderStatus = 'DELIVERED'and dp.status IN ("AVAILABLE","UNAVAILABLE")
            GROUP BY o.createdOn
            ORDER BY o.createdOn ASC
            """)
    List<DashboardOrdersPerDayDTO> getOrdersPerDay();
	 @Query("""
	            SELECT o.orderStatus, COUNT(o.id)
	            FROM Order o
	            WHERE o.orderStatus IN (com.backend.entity.OrderStatus.DELIVERED, com.backend.entity.OrderStatus.CANCELLED)
	            GROUP BY o.orderStatus
	            """)
	    List<Object[]> getOrderStatusCounts();
	    @Query("""
	            SELECT  d.name, SUM(oi.quantity)
	            FROM OrderItem oi
	            JOIN oi.dish d
	            JOIN oi.order o
	            JOIN o.deliveryPartner dp
	            where o.orderStatus="DELIVERED" and dp.status in ("AVAILABLE","UNAVAILABLE")
	            GROUP BY d.name
	            ORDER BY SUM(oi.quantity) DESC limit 10
	            """)
	    List<Object[]> getTopSellingItems();//and dp.status in ("AVAILABLE","UNAVAILABLE")

	    
}
