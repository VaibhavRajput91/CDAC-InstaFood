package com.backend.dto.delivery;

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
public class DeliveryProfileDto {
	// fields
	private Long id;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String licenseNumber;
	private VehicleDetailsDto vehicleDetails = new VehicleDetailsDto();
	
	private DeliveryPartnerAddressDto address = new DeliveryPartnerAddressDto();
}
