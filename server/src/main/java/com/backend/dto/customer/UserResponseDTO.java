package com.backend.dto.customer;

import com.backend.entity.UserRole;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {

	private Long id;
	private String firstName;
	private String lastName;
	private String email;	
	private UserRole role;
	private String postalCode;
}
