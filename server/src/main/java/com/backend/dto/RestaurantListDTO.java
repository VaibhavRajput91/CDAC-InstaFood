package com.backend.dto;

import java.time.LocalTime;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class RestaurantListDTO {

	private Long id;
	private String name;
	private LocalTime openingTime;
	private LocalTime closingTime;
	private String postalCode;
}
