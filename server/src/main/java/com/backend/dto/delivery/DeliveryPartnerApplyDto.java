package com.backend.dto.delivery;

import com.backend.entity.AvailabilityStatus;
import com.backend.entity.KycStatus;
import com.backend.entity.VehicleType;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryPartnerApplyDto {
	private String licenseNumber;
	private String model;
	private VehicleType vehicleType;
	private AvailabilityStatus status = AvailabilityStatus.INACTIVE;
	private KycStatus kycStatus = KycStatus.PENDING;
	
}
