package com.backend.dto.customer;

import com.backend.entity.User;
import com.backend.entity.UserRole;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String phone ;
	private UserRole role;
	private String city;
	private String postalCode;
	private String lineOne;
	private String lineTwo;
	private String state; 
	private String profilePicture;
	


}
