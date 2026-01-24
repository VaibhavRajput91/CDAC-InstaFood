package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="order_items")
@AttributeOverride(name="id", column=@Column(name="order_item_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class OrderItem extends BaseEntity {
	@ManyToOne
	@JoinColumn(name="order_id", nullable=false)
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="dish_id", nullable=false)
	private Dish dish;
	
	@Column(nullable=false)
	private int quantity;
	
	@Column(nullable=false)
	private double price;
}
