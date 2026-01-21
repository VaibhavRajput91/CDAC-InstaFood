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
@Table(name="delivery_partners")
@AttributeOverride(name="id", column=@Column(name="delivery_partner_id"))

@Getter
@Setter
@ToString
public class DeliveryPartner extends BaseEntity{
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@Column(name="license_number", length=15)
	private String licenseNumber;
	
	@Column(name="vehicle_type")
	@Enumerated(EnumType.STRING)
	private VehicleType vehicheType;
	
	private String model;
	
	
}
