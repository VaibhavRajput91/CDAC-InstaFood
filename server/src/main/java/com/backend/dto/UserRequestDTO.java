package com.backend.dto;

import com.backend.entity.UserRole;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {

	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	@NotBlank
	@Email(message = "Invalid Email Format")
	private String email;	
	@NotBlank
	@Pattern
	(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})", 
	message = "Invalid password format")
	private String password;	
	@NotNull
	private String phone;
	private UserRole role;
}
