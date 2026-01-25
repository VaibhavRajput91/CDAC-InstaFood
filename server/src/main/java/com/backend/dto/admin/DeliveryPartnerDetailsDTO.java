package com.backend.dto.admin;

import com.backend.entity.VehicleType;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class DeliveryPartnerDetailsDTO {

	private Long deliveryId;
    private String deliveryPartnerName;

    
    private String email;
    private String phone;

    private String licenseNumber;
    private VehicleType vehicheType;
    private String address;
}
