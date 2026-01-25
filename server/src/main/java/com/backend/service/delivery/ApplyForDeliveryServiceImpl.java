package com.backend.service.delivery;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryPartnerApplyDto;
import com.backend.entity.AvailabilityStatus;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.KycStatus;
import com.backend.entity.User;
import com.backend.entity.UserRole;
import com.backend.repository.delivery.DeliveryPartnerApplyRepository;
import com.backend.repository.delivery.DeliveryUserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ApplyForDeliveryServiceImpl implements ApplyForDeliveryService {

	// dependencies
	private final DeliveryPartnerApplyRepository deliveryPartnerApplyRepository;
	private final DeliveryUserRepository deliveryUserRepository;
	
	@Override
	public boolean deliveryPartnerExists(Long userId) {
		// check if delivery partner exists by user id
		return deliveryPartnerApplyRepository.existsByUserId(userId);
	}

	@Override
	public void applyForDeliveryPartner(Long userId, DeliveryPartnerApplyDto applyDto) {
		// check if delivery partner already exists
		boolean exists = deliveryPartnerExists(userId);
		// if exists then check if can re-apply
		boolean canReapply = false;
		if(exists)
			canReapply = canReapply(userId);
		
		// if not exists then create new delivery partner
		if(!exists) {
			// create new delivery partner
			DeliveryPartner newPartner = new DeliveryPartner();
			User deliveryUser = deliveryUserRepository.findByIdAndRole(userId, UserRole.ROLE_DELIVERY_PARTNER).orElse(null);
			// set details
			newPartner.setUser(deliveryUser);
			newPartner.setLicenseNumber(applyDto.getLicenseNumber());
			newPartner.setModel(applyDto.getModel());
			newPartner.setVehicleType(applyDto.getVehicleType());
			newPartner.setKycStatus(KycStatus.PENDING);
			newPartner.setStatus(AvailabilityStatus.INACTIVE);
			
			return;
		}
		
		// if can re-apply or doesn't exist, create new delivery partner or use the existing one to update details
		else if(exists && canReapply) {
			reapplyForDeliveryPartner(userId, applyDto);
		} 
		// if cannot re-apply, throw exception
		else {
			throw new IllegalStateException("Cannot apply for delivery partner. Existing application is under review or already approved.");
		}
	}

	@Override
	public boolean canReapply(Long userId) {
		KycStatus kycStatus = deliveryPartnerApplyRepository.findKycStatusByUserId(userId);
		return kycStatus == KycStatus.REJECTED;
	}

	@Override
	public void reapplyForDeliveryPartner(Long userId, DeliveryPartnerApplyDto applyDto) {
		DeliveryPartner existingPartner = deliveryPartnerApplyRepository.findById(userId).orElse(null);
		if(existingPartner != null) {
			// update details
			existingPartner.setLicenseNumber(applyDto.getLicenseNumber());
			existingPartner.setModel(applyDto.getModel());
			existingPartner.setVehicleType(applyDto.getVehicleType());
			existingPartner.setKycStatus(KycStatus.PENDING);
			existingPartner.setStatus(AvailabilityStatus.INACTIVE);
			// save updated partner
			deliveryPartnerApplyRepository.save(existingPartner);
		}

	}

}
