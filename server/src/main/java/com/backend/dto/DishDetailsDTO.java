package com.backend.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DishDetailsDTO {
	
	private Long id;
	private String name;
	private String description;
	private Double price;
	private boolean isAvailable;
}
