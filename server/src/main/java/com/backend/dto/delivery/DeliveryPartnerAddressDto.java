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
public class DeliveryPartnerAddressDto {
	private String postalCode;
	private String city;
	private String state;
	private String lineOne;
	private String lineTwo;
}
