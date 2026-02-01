package com.backend.repository.delivery;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.entity.DeliveryLog;

public interface DeliveryWalletRepository extends JpaRepository<DeliveryLog, Long> {

	// method to find the day's earnings so far (JPQL) - use LocalDate to match
	// entity.createdOn
	// method to find the day's earnings so far (JPQL) - use LocalDate to match
	// entity.createdOn
	@Query("select coalesce(count(o.id) * 30.0, 0) "
			+ "from DeliveryLog dl join dl.order o "
			+ "where dl.deliveryPartner.id = :partnerId "
			+ "and dl.status = com.backend.entity.DeliveryStatus.DELIVERED "
			+ "and dl.createdOn between :start and :end")
	public double getEarnings(@Param("partnerId") Long partnerId, @Param("start") LocalDate start,
			@Param("end") LocalDate end);

	// method to find the transactions to delivery partner by id
	public List<DeliveryLog> findByDeliveryPartnerId(Long deliveryPartnerId);

	// pageable finder to get recent logs (use PageRequest.of(0, n))
	public List<DeliveryLog> findByDeliveryPartnerIdOrderByCreatedOnDesc(Long deliveryPartnerId, Pageable pageable);

}