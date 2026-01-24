package com.backend.dto;

import java.time.LocalTime;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
public class RestaurantDetailsDTO {
	
	private String restaurantName;	
	private LocalTime openingTime;
	private LocalTime closingTime;
	private String firstName;
	private String lastName;
	private String phone;
	private String lineOne;
	private String city;
	private String postalCode;
	private String lineTwo;
	private String state;
	
	

}
