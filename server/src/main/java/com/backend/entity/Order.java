package com.backend.entity;

import org.hibernate.annotations.ForeignKey;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="orders")
@AttributeOverride(name="id", column=@Column(name="order_id"))

@Getter
@Setter
@ToString
public class Order extends BaseEntity {
	@ManyToOne
	@JoinColumn(name="customer_id")
	private User customer;
	
	@ManyToOne
	@JoinColumn(name="restaurant_id")
	private Restaurant restaurant;
	
	@ManyToOne
	@JoinColumn(name="delivery_partner_id")
	private DeliveryPartner deliveryPartner;
	
	@Column(name="total_amount")
	private double totalAmount;
	
	@Column(name="order_status")
	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
}
