package com.backend.entity;

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
@Table(name="menus")
@AttributeOverride(name="id", column=@Column(name="menu_id"))

@Getter
@Setter
@ToString
public class Menu extends BaseEntity {
	
	@OneToOne
	@JoinColumn(name="restaurant_id")
	private Restaurant restaurant;
	
	@Column(name="is_active")
	private boolean isActive;
	
	
}
