package com.backend.service.delivery;

import org.springframework.stereotype.Service;

import com.backend.dto.delivery.DeliveryProfileDto;
import com.backend.dto.delivery.DeliveryResponseDto;
import com.backend.entity.DeliveryPartner;
import com.backend.entity.User;
import com.backend.repository.delivery.DeliveryProfileRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryProfileServiceImpl implements DeliveryProfileService {

	// dependencies
	private final DeliveryProfileRepository deliveryProfileRepository;
	
	@Override
	public DeliveryProfileDto getDeliveryPartnerProfile(Long deliveryPartnerId) {
		
		if(!deliveryProfileRepository.existsById(deliveryPartnerId)) {
			throw new RuntimeException("Delivery Partner not found");
		}
		
		DeliveryPartner deliveryPartner =  deliveryProfileRepository.findById(deliveryPartnerId).orElse(null);
		DeliveryProfileDto profileDto = new DeliveryProfileDto();
		profileDto.setId(deliveryPartner.getId());
		profileDto.setFirstName(deliveryPartner.getUser().getFirstName());
		profileDto.setLastName(deliveryPartner.getUser().getLastName());
		profileDto.setEmail(deliveryPartner.getUser().getEmail());
		profileDto.setPhoneNumber(deliveryPartner.getUser().getPhone());
		profileDto.setLicenseNumber(deliveryPartner.getLicenseNumber());
		profileDto.getVehicleDetails().setVehicleModel(deliveryPartner.getModel());
		profileDto.getVehicleDetails().setVehicleType(deliveryPartner.getVehicleType());
		profileDto.getAddress().setLineOne(deliveryPartner.getUser().getAddress().getLineOne());
		profileDto.getAddress().setLineTwo(deliveryPartner.getUser().getAddress().getLineTwo());
		profileDto.getAddress().setCity(deliveryPartner.getUser().getAddress().getCity());
		profileDto.getAddress().setPostalCode(deliveryPartner.getUser().getAddress().getPostalCode());
		profileDto.getAddress().setState(deliveryPartner.getUser().getAddress().getState());
		
		return profileDto;
	}

	@Override
	@Transactional
	public DeliveryProfileDto updateDeliveryPartnerProfile(Long deliveryPartnerId, DeliveryProfileDto profileDto) {
		if(!deliveryProfileRepository.existsById(deliveryPartnerId)) {
			throw new RuntimeException("Delivery Partner not found");
		}
		
		DeliveryPartner deliveryPartner = deliveryProfileRepository.findById(deliveryPartnerId).orElse(null);
		if(deliveryPartner != null) {
			deliveryPartner.getUser().setFirstName(profileDto.getFirstName());
			deliveryPartner.getUser().setLastName(profileDto.getLastName());
			deliveryPartner.getUser().setEmail(profileDto.getEmail());
			deliveryPartner.getUser().setPhone(profileDto.getPhoneNumber());
			deliveryPartner.setLicenseNumber(profileDto.getLicenseNumber());
			deliveryPartner.setModel(profileDto.getVehicleDetails().getVehicleModel());
			deliveryPartner.setVehicleType(profileDto.getVehicleDetails().getVehicleType());
			deliveryPartner.getUser().getAddress().setLineOne(profileDto.getAddress().getLineOne());
			deliveryPartner.getUser().getAddress().setLineTwo(profileDto.getAddress().getLineTwo());
			deliveryPartner.getUser().getAddress().setCity(profileDto.getAddress().getCity());
			deliveryPartner.getUser().getAddress().setState(profileDto.getAddress().getState());
			deliveryPartner.getUser().getAddress().setPostalCode(profileDto.getAddress().getPostalCode());
			
			DeliveryPartner updatedPartner = deliveryProfileRepository.save(deliveryPartner);
			
			DeliveryProfileDto updatedProfileDto = new DeliveryProfileDto();
			updatedProfileDto.setId(updatedPartner.getId());
			updatedProfileDto.setFirstName(updatedPartner.getUser().getFirstName());
			updatedProfileDto.setLastName(updatedPartner.getUser().getLastName());
			updatedProfileDto.setEmail(updatedPartner.getUser().getEmail());
			updatedProfileDto.setPhoneNumber(updatedPartner.getUser().getPhone());
			updatedProfileDto.setLicenseNumber(updatedPartner.getLicenseNumber());
			updatedProfileDto.getVehicleDetails().setVehicleModel(updatedPartner.getModel());
			updatedProfileDto.getVehicleDetails().setVehicleType(updatedPartner.getVehicleType());
			updatedProfileDto.getAddress().setLineOne(updatedPartner.getUser().getAddress().getLineOne());
			updatedProfileDto.getAddress().setLineTwo(updatedPartner.getUser().getAddress().getLineTwo());
			updatedProfileDto.getAddress().setCity(updatedPartner.getUser().getAddress().getCity());
			updatedProfileDto.getAddress().setPostalCode(updatedPartner.getUser().getAddress().getPostalCode());
			updatedProfileDto.getAddress().setState(updatedPartner.getUser().getAddress().getState());
			
			return updatedProfileDto;
		}
		return null;
	}

	@Override
	public DeliveryResponseDto getDeliveryPartnerId(Long userId) {
		Long deliveryPartnerId = deliveryProfileRepository.findByUser(userId);
		DeliveryResponseDto dto = new DeliveryResponseDto();
		dto.setStatus("success");
		dto.setData(deliveryPartnerId);
		dto.setMessage("Delivery Partne Id");
		return dto;
	}

}
