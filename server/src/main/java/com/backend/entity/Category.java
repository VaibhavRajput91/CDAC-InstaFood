package com.backend.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="categories")
@AttributeOverride(name="id", column=@Column(name="category_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Category extends BaseEntity {
	@Column(length=100, unique=true, nullable=false)
	private String name;
	
	@ManyToMany(mappedBy="categories")
	private Set<Dish> dishes = new HashSet<>();
}
