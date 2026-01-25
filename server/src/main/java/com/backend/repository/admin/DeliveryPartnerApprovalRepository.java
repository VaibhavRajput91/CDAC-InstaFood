package com.backend.repository.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;


public interface DeliveryPartnerApprovalRepository extends JpaRepository<DeliveryPartner, Long> {

	List<DeliveryPartner> findByStatus(AvailabilityStatus inactive);

	public Optional<DeliveryPartner> findByIdAndStatus(Long id, AvailabilityStatus inactive);

}
