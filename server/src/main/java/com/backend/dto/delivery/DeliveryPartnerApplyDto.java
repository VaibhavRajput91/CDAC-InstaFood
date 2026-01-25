package com.backend.dto.delivery;

import com.backend.entity.User;
import com.backend.entity.VehicleType;
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
	private User user = new User();
}
