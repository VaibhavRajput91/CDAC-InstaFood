package com.backend.dto;

import java.util.List;

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
	private List<String> categoryName;
	private Double price;
	

}
