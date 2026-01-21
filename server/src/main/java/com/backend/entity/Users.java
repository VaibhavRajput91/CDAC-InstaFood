package com.backend.entity;

import java.time.LocalDate;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="users")
@AttributeOverride(name="id", column=@Column(name="user_id"))

@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"password", "image"})
public class Users extends BaseEntity{
	@Column(name="first_name", length = 30)
	private String firstName;
	
	@Column(name="last_name", length=30)
	private String lastName;
	
	private LocalDate dob;
	
	@Column(length=100, unique=true, nullable=false)
	private String email;
	
	@Column(length=400, nullable=false)
	private String password;
	
	@Column(length=14, unique=true)
	private String phone;
	
	
	
}
