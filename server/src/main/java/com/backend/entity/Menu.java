package com.backend.entity;

import java.util.List;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="menus")
@AttributeOverride(name="id", column=@Column(name="menu_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Menu extends BaseEntity {
	
	@OneToOne
	@JoinColumn(name="restaurant_id", nullable=false, unique=true)
	private Restaurant restaurant;
	
	@Column(name="is_active", nullable=false)
	private boolean isActive;
	
	@OneToMany(mappedBy="menu", cascade=CascadeType.ALL, orphanRemoval=true)
	private List<MenuDish> menuDishes;
	
	
	
	
}
