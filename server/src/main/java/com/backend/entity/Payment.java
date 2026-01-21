package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="payments")
@AttributeOverride(name="id", column=@Column(name="payment_id"))

@Getter
@Setter
@ToString
public class Payment extends BaseEntity {
	@OneToOne
	@JoinColumn(name="order_id")
	private Order order;
	
	private double amount;
	
	@Column(name="payment_method")
	@Enumerated(EnumType.STRING)
	private PaymentMethod paymentMethod;
	
	@Column(name="payment_status")
	@Enumerated(EnumType.STRING)
	private PaymentStatus paymentStatus;
}
