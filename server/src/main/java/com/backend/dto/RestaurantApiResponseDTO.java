package com.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class RestaurantApiResponseDTO {
	private String status;
	private String body;
	
	public RestaurantApiResponseDTO(String status, String body) {
		super();
		this.status = status;
		this.body = body;
	}
	
	
}
