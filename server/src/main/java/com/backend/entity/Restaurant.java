package com.backend.entity;

import java.time.LocalTime;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="restaurants")
@AttributeOverride(name="id", column=@Column(name="restaurant_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Restaurant extends BaseEntity{
	@OneToOne
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@Column(name="restaurant_name", length=150, nullable=false)
	private String restaurantName;
	
	@Column(name="opening_time", nullable=false)
	private LocalTime openingTime;
	
	@Column(name="closing_time", nullable=false)
	private LocalTime closingTime;
	
	@Enumerated(EnumType.STRING)
	private AvailabilityStatus status;

}
