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
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="delivery_logs")
@AttributeOverride(name="id", column=@Column(name="log_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class DeliveryLog extends BaseEntity {
	@OneToOne
	@JoinColumn(name="order_id", nullable=false)
	private Order order;
	
	@OneToOne
	@JoinColumn(name="delivery_partner_id", nullable=false)
	private DeliveryPartner deliveryPartner;
	
	@Column(name="delivery_status")
	@Enumerated(EnumType.STRING)
	private DeliveryStatus status;
	
	@Column(length=150)
	private String notes;
}
