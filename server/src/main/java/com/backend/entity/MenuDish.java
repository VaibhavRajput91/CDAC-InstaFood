package com.backend.entity;

import java.security.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="menu_dishes")

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MenuDish{
	
	@EmbeddedId
	private MenuDishId id;
	
	@ManyToOne
	@MapsId("menuId")
	@JoinColumn(name="menu_id")
	private Menu menu;
	
	@ManyToOne
	@MapsId("dishId")
	@JoinColumn(name="dish_id")
	private Dish dish;
	
	@Column(length=255)
	private String description;
	
	@Column(nullable=false)
	private double price;
	
	@Column(name="is_available",nullable=false)
	private boolean isAvailable=true;
	
	@CreationTimestamp
    private LocalDate createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
