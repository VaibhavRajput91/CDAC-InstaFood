package com.backend.entity;

import java.time.LocalTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="restaurants")
@AttributeOverride(name="id", column=@Column(name="restaurant_id"))

@Getter
@Setter
@ToString
public class Restaurant extends BaseEntity{
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@Column(name="restaurant_name", length=150)
	private String restaurantName;
	
	@Column(name="opening_time")
	private LocalTime openingTime;
	
	@Column(name="closing_time")
	private LocalTime closingTime;
	
	
	private AvailabilityStatus status;
	
	

}
