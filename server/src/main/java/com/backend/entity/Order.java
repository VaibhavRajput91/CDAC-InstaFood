package com.backend.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="orders")
@AttributeOverride(name="id", column=@Column(name="order_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class Order extends BaseEntity {
	@ManyToOne
	@JoinColumn(name="customer_id", nullable=false)
	private User customer;
	
	@ManyToOne
	@JoinColumn(name="restaurant_id", nullable=false)
	private Restaurant restaurant;
	
	@ManyToOne
	@JoinColumn(name="delivery_partner_id", nullable=true)
	private DeliveryPartner deliveryPartner;
	
	@OneToMany(
	        mappedBy = "order",
	        cascade = CascadeType.ALL,
	        orphanRemoval = true
	    )
	private Set<OrderItem> orderItems = new HashSet<>();
	
	@Column(name="total_amount", nullable=false)
	private double totalAmount;
	
	@OneToOne(mappedBy = "order", fetch = FetchType.EAGER)
    private DeliveryLog deliveryPartnerLog;
	
	@Column(name="order_status")
	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
}
