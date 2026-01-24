package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="address")
@AttributeOverride(name="id", column=@Column(name="address_id"))
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Address extends BaseEntity{
	@OneToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@Column(length=100, nullable=false)
	private String city;
	
	@Column(name="postal_code", length=10, nullable=false)
	private String postalCode;
	
	@Column(name="line_one", length=150, nullable=false)
	private String lineOne;
	
	@Column(name="line_two", length=150)
	private String lineTwo;
	
	@Column(length=100)
	private String state;
	
	
}
