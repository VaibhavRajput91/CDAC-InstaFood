package com.backend.dto;

import java.util.Set;

import com.backend.entity.Category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantAddDishDTO {
	private String name;
    private String description;
    private double price;
//    private Set<Category> categories;
    private Set<Long> categoryIds;
}
