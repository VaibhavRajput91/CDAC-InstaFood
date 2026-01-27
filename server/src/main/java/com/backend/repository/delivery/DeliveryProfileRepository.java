package com.backend.repository.delivery;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.User;

public interface DeliveryProfileRepository extends JpaRepository<DeliveryPartner, Long> {
	
	// to check existence of delivery partner by id
	public boolean existsById(Long id);
	
	// method to get delivery partner profile by id
	public Optional<DeliveryPartner> findById(Long id);
	
	// update the details of delivery partner
	public DeliveryPartner save(DeliveryPartner deliveryPartner);
	
	// get deliver partner status by id
	@Query("select dp.status from DeliveryPartner dp where dp.id = ?1")
	public Optional<AvailabilityStatus> getStatusById(Long id);
		
	@Query("select dp.id from DeliveryPartner dp where dp.user.id = ?1")
	public Long findByUser(Long id);
}
