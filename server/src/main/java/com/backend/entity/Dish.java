package com.backend.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="dishes")
@AttributeOverride(name="id", column=@Column(name="dish_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Dish extends BaseEntity {
	
	@Column(length=150, nullable=false)
	private String name;
	
	@ManyToMany
	@JoinTable(name="dish_categories", joinColumns=@JoinColumn(name="dish_id"), inverseJoinColumns=@JoinColumn(name="category_id"))
	private Set<Category> categories = new HashSet<>();
	
	@OneToMany(mappedBy="dish")
	private Set<MenuDish> menuDishes;
}
