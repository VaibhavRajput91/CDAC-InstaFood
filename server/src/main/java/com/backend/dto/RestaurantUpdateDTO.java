package com.backend.dto;


import java.time.LocalTime;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RestaurantUpdateDTO {
	
	private String name;
	private String phone;
	private String city;
	private String postalCode;
	private String lineOne;
	private String lineTwo;
	private String state;
	private LocalTime openingTime;
	private LocalTime closingTime;

}
