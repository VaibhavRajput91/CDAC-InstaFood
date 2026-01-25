package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
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
@Table(name="delivery_partners")
@AttributeOverride(name="id", column=@Column(name="delivery_partner_id"))

@Getter
@Setter
@ToString
@NoArgsConstructor
public class DeliveryPartner extends BaseEntity{
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="user_id", nullable=false)
	private User user;
	
	@Column(name="license_number", length=20, unique=true, nullable=false)
	private String licenseNumber;
	
	@Column(length=50, nullable=false)
	private String model;
	
	@Column(name="vehicle_type")
	@Enumerated(EnumType.STRING)
	private VehicleType vehicleType;
	
	@Enumerated(EnumType.STRING)
	private AvailabilityStatus status;
	
	@Enumerated(EnumType.STRING)
	private KycStatus kycStatus = KycStatus.PENDING;
}
