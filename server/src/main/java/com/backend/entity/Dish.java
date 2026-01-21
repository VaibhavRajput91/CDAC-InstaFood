package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="dishes")
@AttributeOverride(name="id", column=@Column(name="dish_id"))

@Getter
@Setter
@ToString
public class Dish extends BaseEntity {
	@ManyToOne
	@JoinColumn(name="menu_id")
	private Menu menu;
	
	@Column(length=150)
	private String name;
	
	private double price;
	
	@Column(length=500)
	private String description;
	
	@Column(name="is_veg")
	private boolean isVeg;
	
	@Column(name="has_egg")
	private boolean hasEgg;
	
	@Column(name="is_available")
	private boolean isAvailable;
}
