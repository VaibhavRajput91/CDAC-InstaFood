package com.backend.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="address")
@AttributeOverride(name="id", column=@Column(name="address_id"))
@Getter
@Setter
@ToString
public class Address extends BaseEntity{
	@OneToOne
	
	private Users user;
	
	@Column(name="line_one", length=100, nullable=false)
	private String lineOne;
	
	@Column(name="line_two", length=100, nullable=false)
	private String lineTwo;
	
	@Column(length=20, nullable=false)
	private String city;
	
	
}
