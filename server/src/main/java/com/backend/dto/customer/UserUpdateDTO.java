package com.backend.dto.customer;

import com.backend.entity.UserRole;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateDTO {

	@NotBlank
	private String firstName;
	@NotBlank
	private String lastName;
	@NotBlank	
	@NotNull
	private String phone;
}
