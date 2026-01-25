package com.backend.repository.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;

public interface DeliveryPartnerApprovalRepository extends JpaRepository<DeliveryPartner, Long> {

	List<DeliveryPartner> findByStatus(AvailabilityStatus inactive);

}
