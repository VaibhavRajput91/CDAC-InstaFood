package com.backend.dto;


import java.time.LocalTime;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RestaurantUpdateDTO {
	private String restaurantName;	
	private String firstName;
	private String lastName;
	private String phone;
	private String lineOne;
	private String lineTwo;
	private String city;
	private String state;
	private String postalCode;
	private LocalTime openingTime;
	private LocalTime closingTime;
}
